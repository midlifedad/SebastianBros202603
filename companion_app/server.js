'use strict';

const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

// --- Startup Validation ---
const { PORT = 3000, EVENT_TOKEN, ADMIN_TOKEN } = process.env;
if (!EVENT_TOKEN || !ADMIN_TOKEN) {
  console.error('FATAL: EVENT_TOKEN and ADMIN_TOKEN must be set');
  process.exit(1);
}

// --- Express Setup ---
const app = express();
app.use(express.json());
app.set('trust proxy', 1);
app.use(helmet({ frameguard: false, contentSecurityPolicy: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// --- In-Memory State ---
const attendeesData = require('./data/attendees.json');
const state = {
  attendees: new Map(attendeesData.map(a => [a.id, a])),
  checkedIn: new Map(),
  activePoll: null,
  pollResults: [],
};

// --- Health Check (no auth) ---
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    checkedIn: state.checkedIn.size,
    total: state.attendees.size,
  });
});

// --- Auth Middleware ---
function authMiddleware(req, res, next) {
  const token = req.query.token
    || req.headers.authorization?.replace('Bearer ', '');
  if (token === EVENT_TOKEN || token === ADMIN_TOKEN) {
    req.isAdmin = (token === ADMIN_TOKEN);
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

function adminOnly(req, res, next) {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

app.use('/api', authMiddleware);

// --- State Mutation Functions ---
function computePollResults(poll) {
  return {
    id: poll.id,
    question: poll.question,
    options: poll.options,
    counts: poll.options.map((_, i) => (poll.votes.get(i) || new Set()).size),
    total: Array.from(poll.votes.values()).reduce((sum, s) => sum + s.size, 0),
  };
}

function checkIn(attendeeId) {
  const attendee = state.attendees.get(attendeeId);
  if (!attendee) return null;
  if (!state.checkedIn.has(attendeeId)) {
    state.checkedIn.set(attendeeId, {
      id: attendee.id, name: attendee.name, title: attendee.title,
      image: attendee.image, pixar_image: attendee.pixar_image,
      checkedInAt: new Date().toISOString(),
    });
    broadcast({ type: 'checkin', attendee: state.checkedIn.get(attendeeId) });
  }
  return attendee;
}

function createPoll(question, options) {
  const poll = {
    id: `poll_${Date.now()}`,
    question, options,
    votes: new Map(),
  };
  state.activePoll = poll;
  broadcast({ type: 'poll:new', poll: { id: poll.id, question, options } });
  return poll;
}

function recordVote(pollId, attendeeId, optionIndex) {
  if (!state.activePoll || state.activePoll.id !== pollId) {
    return { error: 'No active poll', status: 404 };
  }
  for (const [, voters] of state.activePoll.votes) {
    if (voters.has(attendeeId)) return { error: 'Already voted', status: 409 };
  }
  if (!state.activePoll.votes.has(optionIndex)) {
    state.activePoll.votes.set(optionIndex, new Set());
  }
  state.activePoll.votes.get(optionIndex).add(attendeeId);
  broadcastAdmin({ type: 'poll:update', results: computePollResults(state.activePoll) });
  return { success: true };
}

function closePoll() {
  if (!state.activePoll) return null;
  const results = computePollResults(state.activePoll);
  state.pollResults.push(results);
  state.activePoll = null;
  broadcast({ type: 'poll:closed', results });
  return results;
}

// --- Attendee Routes ---
app.get('/api/attendees', (req, res) => {
  const roster = Array.from(state.attendees.values()).map(a => ({ id: a.id, name: a.name }));
  res.json(roster);
});

app.post('/api/checkin', (req, res) => {
  const { attendeeId } = req.body;
  if (!attendeeId) return res.status(400).json({ error: 'attendeeId required' });
  const attendee = checkIn(attendeeId);
  if (!attendee) return res.status(404).json({ error: 'Attendee not found' });
  res.json(attendee);
});

app.get('/api/attendee/:id', (req, res) => {
  const attendee = state.attendees.get(req.params.id);
  if (!attendee) return res.status(404).json({ error: 'Attendee not found' });
  res.json(attendee);
});

// --- Poll Routes ---
app.get('/api/poll', (req, res) => {
  if (!state.activePoll) return res.json({ poll: null });
  res.json({
    poll: {
      id: state.activePoll.id,
      question: state.activePoll.question,
      options: state.activePoll.options,
    }
  });
});

app.post('/api/poll/vote', (req, res) => {
  const { pollId, attendeeId, optionIndex } = req.body;
  if (!pollId || !attendeeId || optionIndex === undefined) {
    return res.status(400).json({ error: 'pollId, attendeeId, and optionIndex required' });
  }
  const result = recordVote(pollId, attendeeId, optionIndex);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json({ success: true });
});

// --- Admin Routes ---
app.post('/api/admin/poll', adminOnly, (req, res) => {
  const { question, options } = req.body;
  if (!question || !options || !Array.isArray(options) || options.length < 2 || options.length > 4) {
    return res.status(400).json({ error: 'question and 2-4 options required' });
  }
  const poll = createPoll(question, options);
  res.status(201).json({ poll: { id: poll.id, question: poll.question, options: poll.options } });
});

app.post('/api/admin/poll/close', adminOnly, (req, res) => {
  const results = closePoll();
  if (!results) return res.status(404).json({ error: 'No active poll to close' });
  res.json({ results });
});

app.post('/api/admin/reset', adminOnly, (req, res) => {
  state.checkedIn.clear();
  state.activePoll = null;
  state.pollResults = [];
  broadcast({
    type: 'state:sync',
    checkedIn: [],
    activePoll: null,
    checkedInCount: 0,
    totalAttendees: state.attendees.size,
  });
  res.json({ success: true, message: 'All check-ins and polls reset' });
});

app.get('/api/admin/not-checked-in', adminOnly, (req, res) => {
  const notCheckedIn = Array.from(state.attendees.values())
    .filter(a => !state.checkedIn.has(a.id))
    .map(a => ({ id: a.id, name: a.name, title: a.title }));
  res.json(notCheckedIn);
});

app.get('/api/admin/state', adminOnly, (req, res) => {
  res.json({
    checkedIn: Array.from(state.checkedIn.values()),
    activePoll: state.activePoll
      ? { id: state.activePoll.id, question: state.activePoll.question, options: state.activePoll.options }
      : null,
    pollResults: state.pollResults,
    totalAttendees: state.attendees.size,
  });
});

// --- HTTP Server ---
const server = createServer(app);

// --- WebSocket Server ---
const WebSocket = require('ws');
const wss = new WebSocketServer({ noServer: true });

// --- Broadcast Functions ---
function broadcast(message) {
  const data = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(data);
  });
}

function broadcastAdmin(message) {
  const data = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.isAdmin) client.send(data);
  });
}

// --- WebSocket Connection Handler (RTWS-04: state sync on connect) ---
wss.on('connection', (ws, request) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  // State sync on connect
  ws.send(JSON.stringify({
    type: 'state:sync',
    checkedIn: Array.from(state.checkedIn.values()),
    activePoll: state.activePoll
      ? { id: state.activePoll.id, question: state.activePoll.question, options: state.activePoll.options }
      : null,
    checkedInCount: state.checkedIn.size,
    totalAttendees: state.attendees.size,
  }));

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
      }
    } catch (e) { /* ignore malformed messages */ }
  });

  ws.on('error', (err) => console.error('WebSocket error:', err.message));
});

// --- Heartbeat (RTWS-05: 25s interval -- under Railway's ~30s idle timeout) ---
const HEARTBEAT_INTERVAL = 25000;
const heartbeat = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, HEARTBEAT_INTERVAL);

wss.on('close', () => clearInterval(heartbeat));

// --- Upgrade Handler (RTWS-01: token auth) ---
server.on('upgrade', (request, socket, head) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const token = url.searchParams.get('token');

  if (token !== EVENT_TOKEN && token !== ADMIN_TOKEN) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (ws) => {
    ws.isAdmin = (token === ADMIN_TOKEN);
    wss.emit('connection', ws, request);
  });
});

// --- Start ---
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { server, app, state, wss, checkIn, createPoll, recordVote, closePoll, broadcast, broadcastAdmin };
