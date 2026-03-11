'use strict';

const assert = require('assert');
const http = require('http');

// Set env vars before requiring server
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
  }
}

function request(method, urlPath, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      hostname: 'localhost',
      port,
      path: urlPath,
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

async function runTests() {
  console.log('\nTDD Tests - Auth Middleware & REST API\n');

  delete require.cache[require.resolve('../server')];
  const { server, state } = require('../server');

  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.on('listening', resolve);
  });

  port = server.address().port;
  console.log(`  Server started on port ${port}\n`);

  try {
    // AUTH TESTS
    // AUTH-02: No token => 401
    const noToken = await request('GET', '/api/attendees');
    log('AUTH-02: GET /api/attendees without token returns 401', noToken.status === 401, `got ${noToken.status}`);

    // AUTH-02: EVENT_TOKEN => 200
    const eventToken = await request('GET', '/api/attendees?token=test-event');
    log('AUTH-02: GET /api/attendees with EVENT_TOKEN returns 200', eventToken.status === 200, `got ${eventToken.status}`);

    // AUTH-02: ADMIN_TOKEN => 200
    const adminToken = await request('GET', '/api/attendees?token=test-admin');
    log('AUTH-02: GET /api/attendees with ADMIN_TOKEN returns 200', adminToken.status === 200, `got ${adminToken.status}`);

    // AUTH-03: EVENT_TOKEN on admin route => 403
    const eventOnAdmin = await request('POST', '/api/admin/poll?token=test-event', { question: 'Test?', options: ['A', 'B'] });
    log('AUTH-03: POST /api/admin/poll with EVENT_TOKEN returns 403', eventOnAdmin.status === 403, `got ${eventOnAdmin.status}`);

    // AUTH-03: ADMIN_TOKEN on admin route => 201
    const adminOnAdmin = await request('POST', '/api/admin/poll?token=test-admin', { question: 'Test?', options: ['A', 'B'] });
    log('AUTH-03: POST /api/admin/poll with ADMIN_TOKEN returns 201', adminOnAdmin.status === 201, `got ${adminOnAdmin.status}`);

    // DATA TESTS
    // DATA-01: GET /api/attendees returns 21 items with id and name only
    const attendees = await request('GET', '/api/attendees?token=test-event');
    log('DATA-01: GET /api/attendees returns array of length 21', Array.isArray(attendees.body) && attendees.body.length === 21, `got length ${Array.isArray(attendees.body) ? attendees.body.length : 'not array'}`);
    if (Array.isArray(attendees.body) && attendees.body.length > 0) {
      const keys = Object.keys(attendees.body[0]);
      log('DATA-01: Each attendee has only id and name', keys.length === 2 && keys.includes('id') && keys.includes('name'), `got keys: ${keys.join(', ')}`);
    }

    // DATA-02: POST /api/checkin with valid attendeeId
    const firstId = Array.isArray(attendees.body) ? attendees.body[0].id : 'alexei_niemeyer';
    const checkin = await request('POST', '/api/checkin?token=test-event', { attendeeId: firstId });
    log('DATA-02: POST /api/checkin valid attendee returns 200', checkin.status === 200, `got ${checkin.status}`);
    log('DATA-02: Checkin response has sections', checkin.body && checkin.body.sections !== undefined, `missing sections`);

    // DATA-02: Idempotent checkin
    const checkin2 = await request('POST', '/api/checkin?token=test-event', { attendeeId: firstId });
    log('DATA-02: POST /api/checkin idempotent returns 200', checkin2.status === 200, `got ${checkin2.status}`);

    // DATA-02: Invalid attendee
    const badCheckin = await request('POST', '/api/checkin?token=test-event', { attendeeId: 'nonexistent' });
    log('DATA-02: POST /api/checkin invalid attendee returns 404', badCheckin.status === 404, `got ${badCheckin.status}`);

    // DATA-03: GET /api/attendee/:id
    const profile = await request('GET', `/api/attendee/${firstId}?token=test-event`);
    log('DATA-03: GET /api/attendee/:id returns 200', profile.status === 200, `got ${profile.status}`);
    if (profile.body && profile.body.sections) {
      const sectionKeys = Object.keys(profile.body.sections);
      log('DATA-03: Profile has all 6 sections', sectionKeys.length === 6, `got ${sectionKeys.length} sections: ${sectionKeys.join(', ')}`);
    }

    // DATA-03: Invalid id
    const badProfile = await request('GET', '/api/attendee/nonexistent?token=test-event');
    log('DATA-03: GET /api/attendee/nonexistent returns 404', badProfile.status === 404, `got ${badProfile.status}`);

    // DATA-04: GET /api/poll returns null initially
    // Close the poll created above first
    await request('POST', '/api/admin/poll/close?token=test-admin');
    const pollNull = await request('GET', '/api/poll?token=test-event');
    log('DATA-04: GET /api/poll returns null when no active poll', pollNull.body && pollNull.body.poll === null, `got ${JSON.stringify(pollNull.body)}`);

    // POLL LIFECYCLE
    // DATA-06: Create poll
    const newPoll = await request('POST', '/api/admin/poll?token=test-admin', { question: 'Favorite color?', options: ['Red', 'Blue'] });
    log('DATA-06: POST /api/admin/poll creates poll', newPoll.status === 201 && newPoll.body.poll, `got ${newPoll.status}`);

    // DATA-05: Vote
    const pollId = newPoll.body && newPoll.body.poll ? newPoll.body.poll.id : null;
    const vote = await request('POST', '/api/poll/vote?token=test-event', { pollId, attendeeId: firstId, optionIndex: 0 });
    log('DATA-05: POST /api/poll/vote returns 200', vote.status === 200, `got ${vote.status}`);

    // DATA-05: Duplicate vote => 409
    const dupVote = await request('POST', '/api/poll/vote?token=test-event', { pollId, attendeeId: firstId, optionIndex: 1 });
    log('DATA-05: Duplicate vote returns 409', dupVote.status === 409, `got ${dupVote.status}`);

    // DATA-05: Vote with no active poll (we'll close first, then try)
    // First close
    const closeResult = await request('POST', '/api/admin/poll/close?token=test-admin');
    log('DATA-07: POST /api/admin/poll/close returns results', closeResult.status === 200 && closeResult.body.results, `got ${closeResult.status}`);

    // Now vote with no poll
    const noActivePollVote = await request('POST', '/api/poll/vote?token=test-event', { pollId: 'fake', attendeeId: firstId, optionIndex: 0 });
    log('DATA-05: Vote with no active poll returns 404', noActivePollVote.status === 404, `got ${noActivePollVote.status}`);

    // DATA-08: GET /api/admin/state
    const adminState = await request('GET', '/api/admin/state?token=test-admin');
    log('DATA-08: GET /api/admin/state returns 200', adminState.status === 200, `got ${adminState.status}`);
    log('DATA-08: State has totalAttendees=21', adminState.body && adminState.body.totalAttendees === 21, `got ${adminState.body && adminState.body.totalAttendees}`);

  } catch (err) {
    log('Test error', false, err.message);
  }

  server.close();

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Test runner error:', err);
  process.exit(1);
});
