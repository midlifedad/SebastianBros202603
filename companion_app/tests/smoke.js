'use strict';

const assert = require('assert');
const http = require('http');
const { execSync, spawn } = require('child_process');
const path = require('path');

let passed = 0;
let failed = 0;

function log(label, ok, detail) {
  if (ok) {
    passed++;
    console.log(`  PASS: ${label}`);
  } else {
    failed++;
    console.log(`  FAIL: ${label} -- ${detail}`);
  }
}

function httpGet(port, urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${port}${urlPath}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(5000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function runTests() {
  console.log('\nSmoke Tests\n');

  // --- Test 1: Server starts and /health returns 200 ---
  process.env.EVENT_TOKEN = 'test-event-token';
  process.env.ADMIN_TOKEN = 'test-admin-token';
  process.env.PORT = '0'; // OS assigns random port

  // Clear require cache so server.js runs fresh
  delete require.cache[require.resolve('../server')];
  const { server, state } = require('../server');

  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.on('listening', resolve);
  });

  const port = server.address().port;
  console.log(`  Server started on port ${port}\n`);

  try {
    // Test: GET /health returns 200 with correct data
    const health = await httpGet(port, '/health');
    const healthData = JSON.parse(health.body);
    log('/health returns 200', health.status === 200, `got ${health.status}`);
    log('/health status is ok', healthData.status === 'ok', `got ${healthData.status}`);
    log('/health total is 21', healthData.total === 21, `got ${healthData.total}`);
    log('/health checkedIn is 0', healthData.checkedIn === 0, `got ${healthData.checkedIn}`);

    // Test: Static file serving (vendored lib should be accessible)
    const fuse = await httpGet(port, '/vendor/fuse.min.js');
    log('Static /vendor/fuse.min.js returns 200', fuse.status === 200, `got ${fuse.status}`);

    const qr = await httpGet(port, '/vendor/qrcode.min.js');
    log('Static /vendor/qrcode.min.js returns 200', qr.status === 200, `got ${qr.status}`);

    // Test: Check-in page static files (Phase 2)
    const indexRes = await httpGet(port, '/index.html');
    log('GET /index.html returns 200', indexRes.status === 200, `got ${indexRes.status}`);
    log('/index.html Content-Type is text/html',
      indexRes.headers['content-type'].includes('text/html'),
      `got ${indexRes.headers['content-type']}`);
    log('/index.html contains search input',
      indexRes.body.includes('name-input'),
      'name-input not found in body');

    const cssRes = await httpGet(port, '/css/style.css');
    log('GET /css/style.css returns 200', cssRes.status === 200, `got ${cssRes.status}`);
    log('/css/style.css Content-Type is text/css',
      cssRes.headers['content-type'].includes('text/css'),
      `got ${cssRes.headers['content-type']}`);
    log('/css/style.css contains design tokens',
      cssRes.body.includes('--bg-primary'),
      '--bg-primary not found in body');

    const checkinJs = await httpGet(port, '/js/checkin.js');
    log('GET /js/checkin.js returns 200', checkinJs.status === 200, `got ${checkinJs.status}`);
    log('/js/checkin.js Content-Type is javascript',
      checkinJs.headers['content-type'].includes('javascript'),
      `got ${checkinJs.headers['content-type']}`);

    const utilsJs = await httpGet(port, '/js/shared/utils.js');
    log('GET /js/shared/utils.js returns 200', utilsJs.status === 200, `got ${utilsJs.status}`);

    // Test: Guide page static files (Phase 2, Plan 03)
    const guideRes = await httpGet(port, '/guide.html');
    log('GET /guide.html returns 200', guideRes.status === 200, `got ${guideRes.status}`);
    log('/guide.html Content-Type is text/html',
      guideRes.headers['content-type'].includes('text/html'),
      `got ${guideRes.headers['content-type']}`);
    log('/guide.html contains section-tabs',
      guideRes.body.includes('section-tabs'),
      'section-tabs not found in body');
    log('/guide.html contains tab-bar',
      guideRes.body.includes('tab-bar'),
      'tab-bar not found in body');

    const guideJs = await httpGet(port, '/js/guide.js');
    log('GET /js/guide.js returns 200', guideJs.status === 200, `got ${guideJs.status}`);
    log('/js/guide.js Content-Type is javascript',
      guideJs.headers['content-type'].includes('javascript'),
      `got ${guideJs.headers['content-type']}`);

  } catch (err) {
    log('HTTP tests', false, err.message);
  }

  // Test: Server refuses to start without tokens
  try {
    const result = await new Promise((resolve) => {
      const child = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], {
        env: { PATH: process.env.PATH }, // No EVENT_TOKEN or ADMIN_TOKEN
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: 5000,
      });
      let stderr = '';
      child.stderr.on('data', chunk => stderr += chunk);
      child.on('close', (code) => resolve({ code, stderr }));
      child.on('error', (err) => resolve({ code: -1, stderr: err.message }));
    });
    log('Server exits with code 1 when tokens missing', result.code === 1, `got code ${result.code}`);
    log('Error message mentions tokens', result.stderr.includes('EVENT_TOKEN') || result.stderr.includes('ADMIN_TOKEN'), `stderr: ${result.stderr.trim()}`);
  } catch (err) {
    log('Token validation test', false, err.message);
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
