'use strict';

const assert = require('assert');
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

function request(method, urlPath, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, `http://localhost:${port}`);
    const options = {
      method,
      hostname: 'localhost',
      port,
      path: url.pathname + url.search,
      headers: { 'Content-Type': 'application/json', ...headers },
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

async function runTests() {
  console.log('\nE2E User Journey Tests\n');

  // Start server
  delete require.cache[require.resolve('../server')];
  const { server, state } = require('../server');

  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.on('listening', resolve);
  });

  port = server.address().port;
  console.log(`  Server started on port ${port}\n`);

  let firstAttendeeId;
  let secondAttendeeId;
  let pollId;

  try {
    // ========================================================================
    // SECTION 1: Auth Gates
    // ========================================================================
    console.log('  --- Section 1: Auth Gates ---\n');

    // 1. GET /api/attendees with no token -> 401
    const noToken = await request('GET', '/api/attendees');
    log('1. No token returns 401', noToken.status === 401, `got ${noToken.status}`);

    // 2. GET /api/attendees with invalid token -> 401
    const badToken = await request('GET', '/api/attendees?token=invalid');
    log('2. Invalid token returns 401', badToken.status === 401, `got ${badToken.status}`);

    // 3. GET /api/attendees with EVENT_TOKEN -> 200
    const goodToken = await request('GET', '/api/attendees?token=test-event');
    log('3. EVENT_TOKEN returns 200', goodToken.status === 200, `got ${goodToken.status}`);

    // 4. POST /api/admin/poll with EVENT_TOKEN -> 403 (admin auth separation)
    const eventOnAdmin = await request('POST', '/api/admin/poll?token=test-event', {
      question: 'Test?', options: ['A', 'B']
    });
    log('4. EVENT_TOKEN on admin route returns 403', eventOnAdmin.status === 403, `got ${eventOnAdmin.status}`);

    // 5. GET /api/admin/state with ADMIN_TOKEN -> 200
    const adminState = await request('GET', '/api/admin/state?token=test-admin');
    log('5. ADMIN_TOKEN on admin route returns 200', adminState.status === 200, `got ${adminState.status}`);

    // ========================================================================
    // SECTION 2: Check-in Flow
    // ========================================================================
    console.log('\n  --- Section 2: Check-in Flow ---\n');

    // 6. GET /api/attendees -> 200, array of 21, each with only {id, name}
    const attendees = await request('GET', '/api/attendees?token=test-event');
    const isArray = Array.isArray(attendees.body);
    log('6. GET /api/attendees returns array of 21',
      isArray && attendees.body.length === 21,
      `got ${isArray ? 'array length ' + attendees.body.length : 'not array'}`);
    if (isArray && attendees.body.length > 0) {
      const keys = Object.keys(attendees.body[0]);
      log('6b. Attendee shape is {id, name} only',
        keys.length === 2 && keys.includes('id') && keys.includes('name'),
        `got keys: ${keys.join(', ')}`);
      firstAttendeeId = attendees.body[0].id;
      secondAttendeeId = attendees.body[1].id;
    }

    // 7. POST /api/checkin with first attendee ID -> 200, response has sections with 6 keys
    const checkin = await request('POST', '/api/checkin?token=test-event', { attendeeId: firstAttendeeId });
    log('7. Check-in first attendee returns 200', checkin.status === 200, `got ${checkin.status}`);
    if (checkin.body && checkin.body.sections) {
      const sectionKeys = Object.keys(checkin.body.sections);
      log('7b. Check-in response has 6 sections', sectionKeys.length === 6,
        `got ${sectionKeys.length}: ${sectionKeys.join(', ')}`);
    } else {
      log('7b. Check-in response has sections object', false,
        `body keys: ${checkin.body ? Object.keys(checkin.body).join(', ') : 'null'}`);
    }

    // 8. POST /api/checkin with same attendee ID again -> 200, same id (idempotent)
    const checkin2 = await request('POST', '/api/checkin?token=test-event', { attendeeId: firstAttendeeId });
    log('8. Idempotent re-check-in returns 200 with same id',
      checkin2.status === 200 && checkin2.body.id === firstAttendeeId,
      `got status ${checkin2.status}, id: ${checkin2.body ? checkin2.body.id : 'missing'}`);

    // 9. POST /api/checkin with "nonexistent_id" -> 404
    const badCheckin = await request('POST', '/api/checkin?token=test-event', { attendeeId: 'nonexistent_id' });
    log('9. Check-in nonexistent attendee returns 404', badCheckin.status === 404, `got ${badCheckin.status}`);

    // ========================================================================
    // SECTION 3: Poll Lifecycle
    // ========================================================================
    console.log('\n  --- Section 3: Poll Lifecycle ---\n');

    // 10. GET /api/poll -> 200, poll is null
    const pollNull = await request('GET', '/api/poll?token=test-event');
    log('10. No active poll initially', pollNull.status === 200 && pollNull.body.poll === null,
      `got status ${pollNull.status}, poll: ${JSON.stringify(pollNull.body && pollNull.body.poll)}`);

    // 11. POST /api/admin/poll -> 201, has poll.id
    const newPoll = await request('POST', '/api/admin/poll?token=test-admin', {
      question: 'E2E test?', options: ['Yes', 'No', 'Maybe']
    });
    log('11. Create poll returns 201 with poll id',
      newPoll.status === 201 && newPoll.body.poll && newPoll.body.poll.id,
      `got ${newPoll.status}`);
    pollId = newPoll.body && newPoll.body.poll ? newPoll.body.poll.id : null;

    // 12. GET /api/poll -> 200, poll is not null, question matches
    const activePoll = await request('GET', '/api/poll?token=test-event');
    log('12. Active poll has correct question',
      activePoll.status === 200 && activePoll.body.poll !== null && activePoll.body.poll.question === 'E2E test?',
      `got: ${activePoll.body && activePoll.body.poll ? activePoll.body.poll.question : 'null'}`);

    // 13. POST /api/poll/vote with first attendee, optionIndex 0 -> 200
    const vote1 = await request('POST', '/api/poll/vote?token=test-event', {
      pollId, attendeeId: firstAttendeeId, optionIndex: 0
    });
    log('13. First vote succeeds', vote1.status === 200 && vote1.body.success === true,
      `got ${vote1.status}`);

    // 14. POST /api/poll/vote with same attendee again -> 409 (duplicate)
    const dupVote = await request('POST', '/api/poll/vote?token=test-event', {
      pollId, attendeeId: firstAttendeeId, optionIndex: 1
    });
    log('14. Duplicate vote returns 409', dupVote.status === 409, `got ${dupVote.status}`);

    // 15. POST /api/poll/vote with second attendee, optionIndex 1 -> 200
    const vote2 = await request('POST', '/api/poll/vote?token=test-event', {
      pollId, attendeeId: secondAttendeeId, optionIndex: 1
    });
    log('15. Second attendee vote succeeds', vote2.status === 200 && vote2.body.success === true,
      `got ${vote2.status}`);

    // 16. POST /api/admin/poll/close -> 200, results.counts is [1,1,0], results.total is 2
    const closeResult = await request('POST', '/api/admin/poll/close?token=test-admin');
    log('16. Close poll returns correct counts',
      closeResult.status === 200 &&
      closeResult.body.results &&
      closeResult.body.results.counts[0] === 1 &&
      closeResult.body.results.counts[1] === 1 &&
      closeResult.body.results.counts[2] === 0 &&
      closeResult.body.results.total === 2,
      `got counts: ${closeResult.body && closeResult.body.results ? JSON.stringify(closeResult.body.results.counts) : 'missing'}, total: ${closeResult.body && closeResult.body.results ? closeResult.body.results.total : 'missing'}`);

    // 17. GET /api/poll -> 200, poll is null again (poll cleared after close)
    const pollAfterClose = await request('GET', '/api/poll?token=test-event');
    log('17. Poll is null after close',
      pollAfterClose.status === 200 && pollAfterClose.body.poll === null,
      `got poll: ${JSON.stringify(pollAfterClose.body && pollAfterClose.body.poll)}`);

    // ========================================================================
    // SECTION 4: WebSocket Integration
    // ========================================================================
    console.log('\n  --- Section 4: WebSocket Integration ---\n');

    // 18. Connect WS, receive state:sync with checkedInCount >= 1
    const ws1 = await connectWs('test-event');
    const syncMsg = await waitForMessage(ws1);
    log('18. WS state:sync has checkedInCount >= 1',
      syncMsg.type === 'state:sync' && syncMsg.checkedInCount >= 1,
      `got type: ${syncMsg.type}, checkedInCount: ${syncMsg.checkedInCount}`);

    // 19. Connect second WS, check in a new attendee via REST, second WS receives checkin broadcast
    const ws2 = await connectWs('test-event');
    // Consume state:sync on ws2
    await waitForMessage(ws2);

    // Set up broadcast listener BEFORE triggering check-in
    const broadcastPromise = waitForMessage(ws2);

    // Check in a third attendee (first two were checked in earlier)
    const thirdAttendeeId = 'carreen_unguran';
    await request('POST', '/api/checkin?token=test-event', { attendeeId: thirdAttendeeId });

    const broadcastMsg = await broadcastPromise;
    log('19. WS receives checkin broadcast',
      broadcastMsg.type === 'checkin' && broadcastMsg.attendee && broadcastMsg.attendee.id === thirdAttendeeId,
      `got type: ${broadcastMsg.type}, attendee: ${broadcastMsg.attendee ? broadcastMsg.attendee.id : 'missing'}`);

    // 20. Close WS connections
    ws1.close();
    ws2.close();
    log('20. WS connections closed cleanly', true);

  } catch (err) {
    log('Unexpected error', false, err.stack || err.message);
  }

  // Shut down
  server.close();

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Test runner error:', err);
  process.exit(1);
});
