'use strict';

const assert = require('assert');
const http = require('http');

// --- Setup ---
process.env.EVENT_TOKEN = 'test-event';
process.env.ADMIN_TOKEN = 'test-admin';
process.env.PORT = '0';

let passed = 0;
let failed = 0;
let port;
let firstAttendeeId;
let pollId;

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

async function runTests() {
  console.log('\nAPI Integration Tests\n');

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
    // AUTH TESTS
    // ========================================================================
    console.log('  --- Auth Tests ---\n');

    // test_no_token_returns_401
    const noToken = await request('GET', '/api/attendees');
    log('test_no_token_returns_401', noToken.status === 401, `got ${noToken.status}`);

    // test_invalid_token_returns_401
    const badToken = await request('GET', '/api/attendees?token=wrong');
    log('test_invalid_token_returns_401', badToken.status === 401, `got ${badToken.status}`);

    // test_event_token_works
    const eventToken = await request('GET', '/api/attendees?token=test-event');
    log('test_event_token_works', eventToken.status === 200, `got ${eventToken.status}`);

    // test_admin_token_works
    const adminToken = await request('GET', '/api/attendees?token=test-admin');
    log('test_admin_token_works', adminToken.status === 200, `got ${adminToken.status}`);

    // test_event_token_rejected_on_admin
    const eventOnAdmin = await request('POST', '/api/admin/poll?token=test-event', { question: 'Test?', options: ['A', 'B'] });
    log('test_event_token_rejected_on_admin', eventOnAdmin.status === 403, `got ${eventOnAdmin.status}`);

    // test_admin_token_accepted_on_admin
    const adminOnAdmin = await request('GET', '/api/admin/state?token=test-admin');
    log('test_admin_token_accepted_on_admin', adminOnAdmin.status === 200, `got ${adminOnAdmin.status}`);

    // test_bearer_header_works
    const bearer = await request('GET', '/api/attendees', null, { Authorization: 'Bearer test-event' });
    log('test_bearer_header_works', bearer.status === 200, `got ${bearer.status}`);

    // ========================================================================
    // DATA TESTS
    // ========================================================================
    console.log('\n  --- Data Tests ---\n');

    // test_get_attendees_returns_21
    const attendees = await request('GET', '/api/attendees?token=test-event');
    const isArray = Array.isArray(attendees.body);
    log('test_get_attendees_returns_21', isArray && attendees.body.length === 21,
      `got ${isArray ? 'array length ' + attendees.body.length : 'not array'}`);
    if (isArray && attendees.body.length > 0) {
      const keys = Object.keys(attendees.body[0]);
      log('test_get_attendees_only_id_and_name', keys.length === 2 && keys.includes('id') && keys.includes('name'),
        `got keys: ${keys.join(', ')}`);
      firstAttendeeId = attendees.body[0].id;
    }

    // test_checkin_valid_attendee
    const checkin = await request('POST', '/api/checkin?token=test-event', { attendeeId: firstAttendeeId });
    log('test_checkin_valid_attendee', checkin.status === 200, `got ${checkin.status}`);
    log('test_checkin_has_sections', checkin.body && checkin.body.sections !== undefined,
      `body keys: ${checkin.body ? Object.keys(checkin.body).join(', ') : 'null'}`);
    if (checkin.body && checkin.body.sections) {
      const sectionKeys = Object.keys(checkin.body.sections);
      log('test_checkin_has_6_sections', sectionKeys.length === 6,
        `got ${sectionKeys.length}: ${sectionKeys.join(', ')}`);
    }

    // test_checkin_idempotent
    const checkin2 = await request('POST', '/api/checkin?token=test-event', { attendeeId: firstAttendeeId });
    log('test_checkin_idempotent', checkin2.status === 200 && checkin2.body.id === firstAttendeeId,
      `got status ${checkin2.status}`);

    // test_checkin_invalid_attendee
    const badCheckin = await request('POST', '/api/checkin?token=test-event', { attendeeId: 'nonexistent' });
    log('test_checkin_invalid_attendee', badCheckin.status === 404, `got ${badCheckin.status}`);

    // test_checkin_missing_body
    const emptyCheckin = await request('POST', '/api/checkin?token=test-event', {});
    log('test_checkin_missing_body', emptyCheckin.status === 400, `got ${emptyCheckin.status}`);

    // test_get_attendee_by_id
    const profile = await request('GET', `/api/attendee/${firstAttendeeId}?token=test-event`);
    log('test_get_attendee_by_id', profile.status === 200, `got ${profile.status}`);
    if (profile.body && profile.body.sections) {
      const sectionKeys = Object.keys(profile.body.sections);
      log('test_get_attendee_full_profile', sectionKeys.length === 6,
        `got ${sectionKeys.length} sections`);
    }

    // test_get_attendee_invalid_id
    const badProfile = await request('GET', '/api/attendee/nonexistent?token=test-event');
    log('test_get_attendee_invalid_id', badProfile.status === 404, `got ${badProfile.status}`);

    // test_poll_returns_null_initially
    const pollNull = await request('GET', '/api/poll?token=test-event');
    log('test_poll_returns_null_initially', pollNull.status === 200 && pollNull.body.poll === null,
      `got status ${pollNull.status}, poll: ${JSON.stringify(pollNull.body && pollNull.body.poll)}`);

    // ========================================================================
    // POLL LIFECYCLE TESTS
    // ========================================================================
    console.log('\n  --- Poll Lifecycle Tests ---\n');

    // test_create_poll
    const newPoll = await request('POST', '/api/admin/poll?token=test-admin', {
      question: 'Favorite color?', options: ['Red', 'Blue']
    });
    log('test_create_poll', newPoll.status === 201 && newPoll.body.poll && newPoll.body.poll.id,
      `got ${newPoll.status}`);
    pollId = newPoll.body && newPoll.body.poll ? newPoll.body.poll.id : null;

    // test_get_active_poll
    const activePoll = await request('GET', '/api/poll?token=test-event');
    log('test_get_active_poll', activePoll.status === 200 && activePoll.body.poll !== null,
      `got poll: ${JSON.stringify(activePoll.body && activePoll.body.poll)}`);
    if (activePoll.body && activePoll.body.poll) {
      log('test_active_poll_has_question_and_options',
        activePoll.body.poll.question === 'Favorite color?' && Array.isArray(activePoll.body.poll.options),
        `got question: ${activePoll.body.poll.question}`);
    }

    // test_vote
    const vote = await request('POST', '/api/poll/vote?token=test-event', {
      pollId, attendeeId: firstAttendeeId, optionIndex: 0
    });
    log('test_vote', vote.status === 200 && vote.body.success === true, `got ${vote.status}`);

    // test_duplicate_vote
    const dupVote = await request('POST', '/api/poll/vote?token=test-event', {
      pollId, attendeeId: firstAttendeeId, optionIndex: 1
    });
    log('test_duplicate_vote', dupVote.status === 409, `got ${dupVote.status}`);

    // test_close_poll
    const closeResult = await request('POST', '/api/admin/poll/close?token=test-admin');
    log('test_close_poll', closeResult.status === 200 && closeResult.body.results,
      `got ${closeResult.status}`);
    if (closeResult.body && closeResult.body.results) {
      log('test_close_poll_has_counts', Array.isArray(closeResult.body.results.counts),
        `got counts: ${JSON.stringify(closeResult.body.results.counts)}`);
      log('test_close_poll_counts_correct',
        closeResult.body.results.counts[0] === 1 && closeResult.body.results.counts[1] === 0,
        `got counts: ${JSON.stringify(closeResult.body.results.counts)}`);
    }

    // test_vote_after_close
    const voteAfterClose = await request('POST', '/api/poll/vote?token=test-event', {
      pollId, attendeeId: firstAttendeeId, optionIndex: 0
    });
    log('test_vote_after_close', voteAfterClose.status === 404, `got ${voteAfterClose.status}`);

    // ========================================================================
    // ADMIN STATE TEST
    // ========================================================================
    console.log('\n  --- Admin State Test ---\n');

    // test_admin_state
    const adminState = await request('GET', '/api/admin/state?token=test-admin');
    log('test_admin_state', adminState.status === 200, `got ${adminState.status}`);
    if (adminState.body) {
      log('test_admin_state_checkedIn', Array.isArray(adminState.body.checkedIn) && adminState.body.checkedIn.length === 1,
        `got checkedIn length: ${adminState.body.checkedIn ? adminState.body.checkedIn.length : 'missing'}`);
      log('test_admin_state_pollResults', Array.isArray(adminState.body.pollResults) && adminState.body.pollResults.length === 1,
        `got pollResults length: ${adminState.body.pollResults ? adminState.body.pollResults.length : 'missing'}`);
      log('test_admin_state_totalAttendees', adminState.body.totalAttendees === 21,
        `got totalAttendees: ${adminState.body.totalAttendees}`);
      log('test_admin_state_activePoll_null', adminState.body.activePoll === null,
        `got activePoll: ${JSON.stringify(adminState.body.activePoll)}`);
    }

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
