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

const attendeesData = require('../data/attendees.json');
const allIds = attendeesData.map(a => a.id);
const timings = {};

async function runTests() {
  console.log('\nLoad & Concurrency Tests\n');

  // Start server
  delete require.cache[require.resolve('../server')];
  const { server, state } = require('../server');

  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.on('listening', resolve);
  });

  port = server.address().port;
  console.log(`  Server started on port ${port}\n`);

  const connections = [];

  try {
    // ========================================================================
    // PHASE 1: 30 Concurrent WebSocket Connections
    // ========================================================================
    console.log('  --- Phase 1: 30 Concurrent WebSocket Connections ---\n');

    const phase1Start = Date.now();

    // Open 30 WS connections simultaneously
    const connectPromises = [];
    for (let i = 0; i < 30; i++) {
      connectPromises.push(connectWs('test-event'));
    }
    const sockets = await Promise.all(connectPromises);
    connections.push(...sockets);

    // Each must receive state:sync within the timeout (handled by connectWs + waitForMessage)
    const syncPromises = sockets.map(ws => waitForMessage(ws, 2000));
    const syncMsgs = await Promise.all(syncPromises);

    const allSynced = syncMsgs.every(msg => msg.type === 'state:sync');
    log('All 30 received state:sync', allSynced,
      `${syncMsgs.filter(m => m.type === 'state:sync').length}/30 received state:sync`);

    // Assert all 30 are open
    const allOpen = sockets.every(ws => ws.readyState === WebSocket.OPEN);
    log('All 30 connections are OPEN', allOpen,
      `${sockets.filter(ws => ws.readyState === WebSocket.OPEN).length}/30 open`);

    const phase1Ms = Date.now() - phase1Start;
    timings.phase1 = phase1Ms;
    log('Phase 1 under 2 seconds', phase1Ms < 2000, `took ${phase1Ms}ms`);
    console.log(`  -> 30 WS connections established in ${phase1Ms}ms\n`);

    // ========================================================================
    // PHASE 2: 21 Rapid Check-ins with Broadcast Verification
    // ========================================================================
    console.log('  --- Phase 2: 21 Rapid Check-ins with Broadcast Verification ---\n');

    const phase2Start = Date.now();

    // Set up message counters on each connection to track checkin broadcasts
    const checkinCounts = new Array(30).fill(0);
    const checkinDone = new Array(30).fill(null);

    // For each socket, create a promise that resolves once 21 checkin messages arrive
    const broadcastPromises = sockets.map((ws, idx) => {
      return new Promise((resolve) => {
        // Drain any queued messages first
        while (ws._msgQueue.length > 0) {
          const msg = ws._msgQueue.shift();
          if (msg.type === 'checkin') checkinCounts[idx]++;
        }
        if (checkinCounts[idx] >= 21) return resolve();

        // Listen for remaining checkin messages
        const originalHandler = ws.listeners('message').find(fn => true);
        const checkinListener = (data) => {
          let parsed;
          try { parsed = JSON.parse(data.toString()); }
          catch { return; }

          if (parsed.type === 'checkin') {
            checkinCounts[idx]++;
            if (checkinCounts[idx] >= 21) {
              resolve();
            }
          }
          // Also push non-checkin messages to queue for other consumers
          if (parsed.type !== 'checkin') {
            ws._msgQueue.push(parsed);
          }
        };
        ws.on('message', checkinListener);
        checkinDone[idx] = () => ws.removeListener('message', checkinListener);

        // Timeout fallback
        setTimeout(() => resolve(), 2000);
      });
    });

    // Fire all 21 check-ins simultaneously
    const checkinPromises = allIds.map(id =>
      request('POST', '/api/checkin?token=test-event', { attendeeId: id })
    );
    const checkinResults = await Promise.all(checkinPromises);

    // Wait for broadcasts to arrive at all connections
    await Promise.all(broadcastPromises);

    // Clean up listeners
    checkinDone.forEach(fn => fn && fn());

    // Assert all 21 check-ins returned 200
    const allCheckinOk = checkinResults.every(r => r.status === 200);
    log('All 21 check-ins returned 200', allCheckinOk,
      `${checkinResults.filter(r => r.status === 200).length}/21 returned 200`);

    // Assert each of the 30 WS clients received exactly 21 checkin messages
    const allReceivedAll = checkinCounts.every(c => c === 21);
    const totalBroadcasts = checkinCounts.reduce((sum, c) => sum + c, 0);
    log('Each of 30 clients received all 21 checkin broadcasts', allReceivedAll,
      `counts: [${checkinCounts.join(', ')}], min: ${Math.min(...checkinCounts)}, max: ${Math.max(...checkinCounts)}`);

    const phase2Ms = Date.now() - phase2Start;
    timings.phase2 = phase2Ms;
    log('Phase 2 under 2 seconds', phase2Ms < 2000, `took ${phase2Ms}ms`);
    console.log(`  -> 21 check-ins + ${totalBroadcasts} broadcasts (21x30) in ${phase2Ms}ms\n`);

    // ========================================================================
    // PHASE 3: Poll with 21 Votes
    // ========================================================================
    console.log('  --- Phase 3: Poll with 21 Votes ---\n');

    const phase3Start = Date.now();

    // Create poll
    const newPoll = await request('POST', '/api/admin/poll?token=test-admin', {
      question: 'Load test poll?', options: ['Option A', 'Option B', 'Option C']
    });
    log('Poll created', newPoll.status === 201, `got ${newPoll.status}`);
    const pollId = newPoll.body && newPoll.body.poll ? newPoll.body.poll.id : null;

    // Fire 21 votes simultaneously, one per attendee
    const numOptions = 3;
    const votePromises = allIds.map((id, i) =>
      request('POST', '/api/poll/vote?token=test-event', {
        pollId, attendeeId: id, optionIndex: i % numOptions
      })
    );
    const voteResults = await Promise.all(votePromises);

    const allVotesOk = voteResults.every(r => r.status === 200);
    log('All 21 votes returned 200', allVotesOk,
      `${voteResults.filter(r => r.status === 200).length}/21 returned 200`);

    // Close poll and verify results
    const closeResult = await request('POST', '/api/admin/poll/close?token=test-admin');
    log('Poll close returns 200', closeResult.status === 200, `got ${closeResult.status}`);

    if (closeResult.body && closeResult.body.results) {
      log('Poll total is 21', closeResult.body.results.total === 21,
        `got total: ${closeResult.body.results.total}`);
      const countsSum = closeResult.body.results.counts.reduce((sum, c) => sum + c, 0);
      log('Sum of counts is 21', countsSum === 21,
        `got sum: ${countsSum}, counts: ${JSON.stringify(closeResult.body.results.counts)}`);
    } else {
      log('Poll results exist', false, 'no results in response');
    }

    const phase3Ms = Date.now() - phase3Start;
    timings.phase3 = phase3Ms;
    log('Phase 3 under 2 seconds', phase3Ms < 2000, `took ${phase3Ms}ms`);
    console.log(`  -> Poll lifecycle with 21 votes in ${phase3Ms}ms\n`);

    // ========================================================================
    // PHASE 4: Cleanup and Summary
    // ========================================================================
    console.log('  --- Phase 4: Cleanup and Summary ---\n');

    // Close all 30 WebSocket connections
    connections.forEach(ws => {
      try { ws.close(); } catch (e) { /* ignore */ }
    });

    // Assert no operation exceeded 2 seconds
    const allUnder2s = Object.values(timings).every(t => t < 2000);
    log('All phases completed under 2 seconds', allUnder2s,
      Object.entries(timings).map(([k, v]) => `${k}: ${v}ms`).join(', '));

    // Print timing summary
    console.log('  Timing Summary:');
    console.log(`    Phase 1 (30 WS connections):      ${timings.phase1}ms`);
    console.log(`    Phase 2 (21 check-ins + 630 bcast): ${timings.phase2}ms`);
    console.log(`    Phase 3 (poll + 21 votes):         ${timings.phase3}ms`);
    console.log('');

  } catch (err) {
    log('Unexpected error', false, err.stack || err.message);
    // Clean up connections on error
    connections.forEach(ws => {
      try { ws.close(); } catch (e) { /* ignore */ }
    });
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
