'use strict';

const assert = require('assert');
const http = require('http');
const path = require('path');

let passed = 0;
let failed = 0;

function log(label, ok, detail) {
  if (ok) {
    passed++;
    console.log('  PASS: ' + label);
  } else {
    failed++;
    console.log('  FAIL: ' + label + ' -- ' + detail);
  }
}

function httpGet(port, urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get('http://127.0.0.1:' + port + urlPath, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(5000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function runTests() {
  console.log('\nGuide Page Tests\n');

  // --- Data contract tests (no server needed) ---
  console.log('  -- Data Contract Tests --\n');

  const attendees = require('../data/attendees.json');
  const SECTION_KEYS = ['ai_impact', 'ai_tools', 'agentic_frameworks', 'role_transformation', 'learning_resources', 'industry_use_cases'];

  // Test: every attendee has all 6 section keys
  let allHaveKeys = true;
  let missingInfo = '';
  attendees.forEach(a => {
    SECTION_KEYS.forEach(key => {
      if (!a.sections || !(key in a.sections)) {
        allHaveKeys = false;
        missingInfo = a.id + ' missing ' + key;
      }
    });
  });
  log('Every attendee has all 6 section keys', allHaveKeys, missingInfo);

  // Test: every section value is a non-empty string
  let allNonEmpty = true;
  let emptyInfo = '';
  attendees.forEach(a => {
    SECTION_KEYS.forEach(key => {
      if (!a.sections || typeof a.sections[key] !== 'string' || a.sections[key].length === 0) {
        allNonEmpty = false;
        emptyInfo = a.id + '.' + key + ' is empty or not a string';
      }
    });
  });
  log('Every section value is a non-empty string', allNonEmpty, emptyInfo);

  // Test: sections are string type (not null, not object)
  let allStrings = true;
  let typeInfo = '';
  attendees.forEach(a => {
    SECTION_KEYS.forEach(key => {
      const val = a.sections ? a.sections[key] : undefined;
      if (typeof val !== 'string') {
        allStrings = false;
        typeInfo = a.id + '.' + key + ' is ' + typeof val;
      }
    });
  });
  log('All section values are string type', allStrings, typeInfo);

  // Test: section content contains expected markdown patterns
  let hasMarkdownPatterns = true;
  let patternInfo = '';
  const markdownPattern = /\*\*|\[.*\]\(|\n-\s/;
  SECTION_KEYS.forEach(key => {
    const anyMatch = attendees.some(a => a.sections && markdownPattern.test(a.sections[key]));
    if (!anyMatch) {
      hasMarkdownPatterns = false;
      patternInfo = key + ' has no markdown patterns across any attendee';
    }
  });
  log('Section content contains markdown patterns (bold/links/bullets)', hasMarkdownPatterns, patternInfo);

  // Test: attendees count is 21
  log('Attendees count is 21', attendees.length === 21, 'got ' + attendees.length);

  // --- API tests (server needed) ---
  console.log('\n  -- API Tests --\n');

  process.env.EVENT_TOKEN = 'test-event-token';
  process.env.ADMIN_TOKEN = 'test-admin-token';
  process.env.PORT = '0';

  delete require.cache[require.resolve('../server')];
  const { server } = require('../server');

  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.on('listening', resolve);
  });

  const port = server.address().port;

  try {
    // Test: GET /api/attendee/:id returns sections with all 6 keys
    const knownId = attendees[0].id;
    const res = await httpGet(port, '/api/attendee/' + knownId + '?token=test-event-token');
    const data = JSON.parse(res.body);
    let apiHasAllKeys = true;
    let apiMissing = '';
    SECTION_KEYS.forEach(key => {
      if (!data.sections || !(key in data.sections)) {
        apiHasAllKeys = false;
        apiMissing = key;
      }
    });
    log('API /api/attendee/:id returns all 6 section keys', apiHasAllKeys, 'missing ' + apiMissing);

    // Test: API section values are non-empty strings
    let apiAllStrings = true;
    let apiTypeInfo = '';
    SECTION_KEYS.forEach(key => {
      const val = data.sections ? data.sections[key] : undefined;
      if (typeof val !== 'string' || val.length === 0) {
        apiAllStrings = false;
        apiTypeInfo = key + ' is ' + typeof val;
      }
    });
    log('API section values are non-empty strings', apiAllStrings, apiTypeInfo);

    // Test: API returns 404 for unknown attendee
    const notFoundRes = await httpGet(port, '/api/attendee/nonexistent_person?token=test-event-token');
    log('API returns 404 for unknown attendee', notFoundRes.status === 404, 'got ' + notFoundRes.status);

    // Test: Guide page static files
    const guideHtml = await httpGet(port, '/guide.html');
    log('GET /guide.html returns 200', guideHtml.status === 200, 'got ' + guideHtml.status);
    log('/guide.html Content-Type is text/html',
      guideHtml.headers['content-type'].includes('text/html'),
      'got ' + guideHtml.headers['content-type']);
    log('/guide.html contains section-tabs',
      guideHtml.body.includes('section-tabs'),
      'section-tabs not found');
    log('/guide.html contains tab-bar',
      guideHtml.body.includes('tab-bar'),
      'tab-bar not found');

    const guideJs = await httpGet(port, '/js/guide.js');
    log('GET /js/guide.js returns 200', guideJs.status === 200, 'got ' + guideJs.status);
    log('/js/guide.js Content-Type is javascript',
      guideJs.headers['content-type'].includes('javascript'),
      'got ' + guideJs.headers['content-type']);

  } catch (err) {
    log('API/static tests', false, err.message);
  }

  server.close();

  console.log('\nResults: ' + passed + ' passed, ' + failed + ' failed\n');
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Test runner error:', err);
  process.exit(1);
});
