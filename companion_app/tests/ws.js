'use strict';

const http = require('http');
const WebSocket = require('ws');

// --- Setup ---
process.env.EVENT_TOKEN = 'test-event';
process.env.ADMIN_TOKEN = 'test-admin';
process.env.PORT = '0';

let passed = 0;
let failed = 0;
let port;

function log(label, ok, detail) {
  if (ok) {
    passed++;
    console.log(`  PASS: ${label}`);
  } else {
    failed++;
    console.log(`  FAIL: ${label} -- ${detail}`);
    process.exitCode = 1;
  }
}

function request(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, `http://localhost:${port}`);
    const options = {
      method,
      hostname: 'localhost',
      port,
      path: url.pathname + url.search,
      headers: { 'Content-Type': 'application/json' },
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function connectWs(token) {
  return new Promise((resolve, reject) => {
    const url = token !== undefined
      ? `ws://localhost:${port}/ws?token=${token}`
      : `ws://localhost:${port}/ws`;
    const ws = new WebSocket(url);

    // Buffer messages from the start so none are lost between open and listener setup
    ws._msgQueue = [];
    ws._msgWaiters = [];
    ws.on('message', (data) => {
      let parsed;
      try { parsed = JSON.parse(data.toString()); }
      catch { parsed = data.toString(); }
      if (ws._msgWaiters.length > 0) {
        const waiter = ws._msgWaiters.shift();
        waiter.resolve(parsed);
      } else {
        ws._msgQueue.push(parsed);
      }
    });

    const timeout = setTimeout(() => { ws.close(); reject(new Error('WS connect timeout')); }, 5000);
    ws.on('open', () => { clearTimeout(timeout); resolve(ws); });
    ws.on('error', (err) => { clearTimeout(timeout); reject(err); });
  });
}

function waitForMessage(ws, timeoutMs = 5000) {
  // Check buffer first
  if (ws._msgQueue && ws._msgQueue.length > 0) {
    return Promise.resolve(ws._msgQueue.shift());
  }
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      // Remove waiter on timeout
      if (ws._msgWaiters) {
        const idx = ws._msgWaiters.findIndex(w => w.resolve === resolve);
        if (idx !== -1) ws._msgWaiters.splice(idx, 1);
      }
      reject(new Error('WS message timeout'));
    }, timeoutMs);
    const waiter = {
      resolve: (msg) => { clearTimeout(timeout); resolve(msg); },
    };
    if (ws._msgWaiters) {
      ws._msgWaiters.push(waiter);
    } else {
      reject(new Error('ws not initialized with connectWs'));
    }
  });
}

function expectClose(token, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const url = token !== undefined
      ? `ws://localhost:${port}/ws?token=${token}`
      : `ws://localhost:${port}/ws`;
    const ws = new WebSocket(url);
    const timeout = setTimeout(() => { ws.close(); resolve('timeout'); }, timeoutMs);
    ws.on('close', () => { clearTimeout(timeout); resolve('closed'); });
    ws.on('error', () => { clearTimeout(timeout); resolve('error'); });
    ws.on('open', () => { clearTimeout(timeout); ws.close(); resolve('opened'); });
  });
}

const openSockets = [];

async function runTests() {
  console.log('\nWebSocket Integration Tests\n');

  // Start server
  delete require.cache[require.resolve('../server')];
  const { server, state } = require('../server');

  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.on('listening', resolve);
  });

  port = server.address().port;
  console.log(`  Server started on port ${port}\n`);

  try {
    // ========================================================================
    // RTWS-01: AUTH TESTS
    // ========================================================================
    console.log('  --- RTWS-01: Auth Tests ---\n');

    // test_ws_connects_with_event_token
    try {
      const ws = await connectWs('test-event');
      openSockets.push(ws);
      log('test_ws_connects_with_event_token', true);
      ws.close();
    } catch (err) {
      log('test_ws_connects_with_event_token', false, err.message);
    }

    // test_ws_connects_with_admin_token
    try {
      const ws = await connectWs('test-admin');
      openSockets.push(ws);
      log('test_ws_connects_with_admin_token', true);
      ws.close();
    } catch (err) {
      log('test_ws_connects_with_admin_token', false, err.message);
    }

    // test_ws_rejects_invalid_token
    {
      const result = await expectClose('wrong');
      log('test_ws_rejects_invalid_token', result === 'error' || result === 'closed',
        `got: ${result}`);
    }

    // test_ws_rejects_no_token
    {
      const result = await expectClose(undefined);
      log('test_ws_rejects_no_token', result === 'error' || result === 'closed',
        `got: ${result}`);
    }

    // ========================================================================
    // RTWS-04: STATE SYNC TEST
    // ========================================================================
    console.log('\n  --- RTWS-04: State Sync Test ---\n');

    // test_state_sync_on_connect
    try {
      const ws = await connectWs('test-event');
      openSockets.push(ws);
      const msg = await waitForMessage(ws);
      log('test_state_sync_on_connect_type', msg.type === 'state:sync',
        `got type: ${msg.type}`);
      log('test_state_sync_on_connect_checkedIn', Array.isArray(msg.checkedIn),
        `got: ${typeof msg.checkedIn}`);
      log('test_state_sync_on_connect_totalAttendees', msg.totalAttendees === 21,
        `got: ${msg.totalAttendees}`);
      log('test_state_sync_on_connect_checkedInCount', msg.checkedInCount === 0,
        `got: ${msg.checkedInCount}`);
      log('test_state_sync_on_connect_activePoll', msg.activePoll === null,
        `got: ${JSON.stringify(msg.activePoll)}`);
      ws.close();
    } catch (err) {
      log('test_state_sync_on_connect', false, err.message);
    }

    // ========================================================================
    // RTWS-02: BROADCAST TESTS
    // ========================================================================
    console.log('\n  --- RTWS-02: Broadcast Tests ---\n');

    // test_checkin_broadcast
    try {
      const ws = await connectWs('test-event');
      openSockets.push(ws);
      // Consume state:sync first
      await waitForMessage(ws);

      // Get first attendee ID
      const attendeesRes = await request('GET', `/api/attendees?token=test-event`);
      const firstId = attendeesRes.body[0].id;

      // Set up broadcast listener BEFORE triggering the action
      const broadcastPromise = waitForMessage(ws);

      // Perform check-in via REST (broadcast fires synchronously)
      await request('POST', `/api/checkin?token=test-event`, { attendeeId: firstId });

      // Wait for broadcast
      const msg = await broadcastPromise;
      log('test_checkin_broadcast_type', msg.type === 'checkin', `got type: ${msg.type}`);
      log('test_checkin_broadcast_attendee', msg.attendee && msg.attendee.id === firstId,
        `got attendee id: ${msg.attendee ? msg.attendee.id : 'missing'}`);
      ws.close();
    } catch (err) {
      log('test_checkin_broadcast', false, err.message);
    }

    // test_poll_broadcast
    try {
      const ws = await connectWs('test-event');
      openSockets.push(ws);
      // Consume state:sync
      await waitForMessage(ws);

      // Set up broadcast listener BEFORE triggering the action
      const broadcastPromise = waitForMessage(ws);

      // Create poll via REST (broadcast fires synchronously)
      await request('POST', `/api/admin/poll?token=test-admin`, {
        question: 'WS test?', options: ['Yes', 'No']
      });

      // Wait for broadcast
      const msg = await broadcastPromise;
      log('test_poll_broadcast_type', msg.type === 'poll:new', `got type: ${msg.type}`);
      log('test_poll_broadcast_question', msg.poll && msg.poll.question === 'WS test?',
        `got: ${msg.poll ? msg.poll.question : 'missing'}`);
      ws.close();
    } catch (err) {
      log('test_poll_broadcast', false, err.message);
    }

    // test_poll_close_broadcast
    try {
      const ws = await connectWs('test-event');
      openSockets.push(ws);
      // Consume state:sync (which now has the active poll from above)
      await waitForMessage(ws);

      // Set up broadcast listener BEFORE triggering the action
      const broadcastPromise = waitForMessage(ws);

      // Close poll via REST (broadcast fires synchronously)
      await request('POST', `/api/admin/poll/close?token=test-admin`);

      // Wait for broadcast
      const msg = await broadcastPromise;
      log('test_poll_close_broadcast_type', msg.type === 'poll:closed', `got type: ${msg.type}`);
      log('test_poll_close_broadcast_results', msg.results && msg.results.question === 'WS test?',
        `got: ${msg.results ? msg.results.question : 'missing'}`);
      ws.close();
    } catch (err) {
      log('test_poll_close_broadcast', false, err.message);
    }

    // ========================================================================
    // RTWS-05: HEARTBEAT TEST
    // ========================================================================
    console.log('\n  --- RTWS-05: Heartbeat Test ---\n');

    // test_application_heartbeat (application-level ping/pong)
    try {
      const ws = await connectWs('test-event');
      openSockets.push(ws);
      // Consume state:sync
      await waitForMessage(ws);

      // Set up pong listener BEFORE sending ping
      const pongPromise = waitForMessage(ws);

      // Send application-level ping
      ws.send(JSON.stringify({ type: 'ping' }));

      // Wait for pong
      const msg = await pongPromise;
      log('test_application_heartbeat', msg.type === 'pong', `got type: ${msg.type}`);
      ws.close();
    } catch (err) {
      log('test_application_heartbeat', false, err.message);
    }

  } catch (err) {
    log('Unexpected error', false, err.stack || err.message);
  }

  // Clean up all open sockets
  openSockets.forEach((ws) => {
    try { ws.close(); } catch (e) { /* ignore */ }
  });

  // Shut down server
  server.close();

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Test runner error:', err);
  process.exit(1);
});
