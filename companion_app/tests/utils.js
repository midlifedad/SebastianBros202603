'use strict';

const assert = require('assert');
const path = require('path');

// Load Fuse.js from node_modules (same version as vendored)
const Fuse = require(path.join(__dirname, '..', 'node_modules', 'fuse.js'));

// Load actual attendee data for realistic testing
const attendees = require(path.join(__dirname, '..', 'data', 'attendees.json'));

let passed = 0;
let failed = 0;
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

async function run() {
  console.log('\nUtils Tests\n');

  for (const t of tests) {
    try {
      await t.fn();
      passed++;
      console.log(`  PASS: ${t.name}`);
    } catch (err) {
      failed++;
      console.log(`  FAIL: ${t.name} -- ${err.message}`);
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

// --- Make Fuse available globally for utils.js (browser-style) ---
global.Fuse = Fuse;

// Simulate browser environment minimally for IIFE
global.window = global;

// Load utils.js by evaluating it in global context (browser-style IIFE)
const fs = require('fs');
const vm = require('vm');
const utilsPath = path.join(__dirname, '..', 'public', 'js', 'shared', 'utils.js');

let utils;
try {
  let utilsCode = fs.readFileSync(utilsPath, 'utf8');
  // In Node, 'const' at top level in vm.runInThisContext doesn't become global.
  // Replace the top-level 'const utils' with a global assignment for testing.
  utilsCode = utilsCode.replace(/^'use strict';\s*\n/, '');
  utilsCode = utilsCode.replace(/^const utils\s*=/m, 'global.utils =');
  vm.runInThisContext(utilsCode, { filename: 'utils.js' });
  utils = global.utils;
} catch (e) {
  // utils.js does not exist yet (RED phase) -- tests should fail
  utils = null;
}

// =========================================================================
// createFuzzySearch tests
// =========================================================================

test('createFuzzySearch exists and is a function', () => {
  assert.ok(utils, 'utils module not loaded');
  assert.strictEqual(typeof utils.createFuzzySearch, 'function');
});

test('createFuzzySearch returns object with search method', () => {
  const searcher = utils.createFuzzySearch([{ id: 'a', name: 'Test' }]);
  assert.strictEqual(typeof searcher.search, 'function');
});

test('search("") returns empty array', () => {
  const searcher = utils.createFuzzySearch(attendees.map(a => ({ id: a.id, name: a.name })));
  const results = searcher.search('');
  assert.ok(Array.isArray(results));
  assert.strictEqual(results.length, 0);
});

test('search("a") (1 char) returns empty array — 2+ char minimum', () => {
  const searcher = utils.createFuzzySearch(attendees.map(a => ({ id: a.id, name: a.name })));
  const results = searcher.search('a');
  assert.strictEqual(results.length, 0);
});

test('search("mark") returns max 5 results with item.id and item.name', () => {
  const searcher = utils.createFuzzySearch(attendees.map(a => ({ id: a.id, name: a.name })));
  const results = searcher.search('mark');
  assert.ok(results.length > 0, 'Expected at least 1 result');
  assert.ok(results.length <= 5, `Expected max 5 results, got ${results.length}`);
  results.forEach(r => {
    assert.ok(r.id, 'Result missing id');
    assert.ok(r.name, 'Result missing name');
  });
  // Mark Nelson and Mark Salter should be in results
  const names = results.map(r => r.name);
  assert.ok(names.some(n => n.includes('Mark')), 'Expected "Mark" in results');
});

test('search("seb") finds Sebastian family members', () => {
  const searcher = utils.createFuzzySearch(attendees.map(a => ({ id: a.id, name: a.name })));
  const results = searcher.search('seb');
  assert.ok(results.length > 0, 'Expected at least 1 Sebastian');
  const names = results.map(r => r.name);
  assert.ok(names.some(n => n.includes('Sebastian')), 'Expected "Sebastian" in results');
});

test('search("WALI") is case-insensitive, finds Wali Mahmood', () => {
  const searcher = utils.createFuzzySearch(attendees.map(a => ({ id: a.id, name: a.name })));
  const results = searcher.search('WALI');
  assert.ok(results.length > 0, 'Expected at least 1 result for "WALI"');
  const names = results.map(r => r.name);
  assert.ok(names.some(n => n.includes('Wali')), 'Expected "Wali Mahmood" in results');
});

// =========================================================================
// renderMarkdown tests
// =========================================================================

test('renderMarkdown exists and is a function', () => {
  assert.ok(utils, 'utils module not loaded');
  assert.strictEqual(typeof utils.renderMarkdown, 'function');
});

test('renderMarkdown("") returns empty string', () => {
  assert.strictEqual(utils.renderMarkdown(''), '');
});

test('renderMarkdown("**bold**") returns string containing <strong>bold</strong>', () => {
  const result = utils.renderMarkdown('**bold**');
  assert.ok(result.includes('<strong>bold</strong>'), `Expected <strong>bold</strong>, got: ${result}`);
});

test('renderMarkdown("[text](url)") returns anchor with target="_blank" rel="noopener noreferrer"', () => {
  const result = utils.renderMarkdown('[text](https://example.com)');
  assert.ok(result.includes('target="_blank"'), `Missing target="_blank" in: ${result}`);
  assert.ok(result.includes('rel="noopener noreferrer"'), `Missing rel="noopener noreferrer" in: ${result}`);
  assert.ok(result.includes('href="https://example.com"'), `Missing href in: ${result}`);
  assert.ok(result.includes('>text</a>'), `Missing link text in: ${result}`);
});

test('renderMarkdown("- item1\\n- item2") returns ul with two li elements', () => {
  const result = utils.renderMarkdown('- item1\n- item2');
  assert.ok(result.includes('<ul>'), `Missing <ul> in: ${result}`);
  assert.ok(result.includes('<li>'), `Missing <li> in: ${result}`);
  // Count li occurrences
  const liCount = (result.match(/<li>/g) || []).length;
  assert.strictEqual(liCount, 2, `Expected 2 <li>, got ${liCount}`);
});

test('renderMarkdown("1) first\\n2) second") returns ol with two li elements', () => {
  const result = utils.renderMarkdown('1) first\n2) second');
  assert.ok(result.includes('<ol>'), `Missing <ol> in: ${result}`);
  const liCount = (result.match(/<li>/g) || []).length;
  assert.strictEqual(liCount, 2, `Expected 2 <li>, got ${liCount}`);
});

test('renderMarkdown("# Heading") returns h3 tag (offset by +2 levels)', () => {
  const result = utils.renderMarkdown('# Heading');
  assert.ok(result.includes('<h3>'), `Expected <h3> in: ${result}`);
  assert.ok(result.includes('Heading'), `Expected "Heading" text in: ${result}`);
});

test('renderMarkdown escapes HTML entities', () => {
  const result = utils.renderMarkdown('Use <script> & "quotes"');
  assert.ok(result.includes('&lt;script&gt;'), `Expected escaped <script> in: ${result}`);
  assert.ok(result.includes('&amp;'), `Expected escaped & in: ${result}`);
});

test('renderMarkdown with mixed content renders correctly', () => {
  const input = '# My Title\n\n**Important:** Check [this](https://example.com) out.\n\n- First item\n- Second item\n\n1) Step one\n2) Step two';
  const result = utils.renderMarkdown(input);
  assert.ok(result.includes('<h3>'), 'Missing heading');
  assert.ok(result.includes('<strong>'), 'Missing bold');
  assert.ok(result.includes('target="_blank"'), 'Missing link target');
  assert.ok(result.includes('<ul>'), 'Missing unordered list');
  assert.ok(result.includes('<ol>'), 'Missing ordered list');
});

// =========================================================================
// getProfileImage tests
// =========================================================================

test('getProfileImage exists and is a function', () => {
  assert.ok(utils, 'utils module not loaded');
  assert.strictEqual(typeof utils.getProfileImage, 'function');
});

test('getProfileImage({image:"photo.jpg"}) returns "/images/photo.jpg"', () => {
  const result = utils.getProfileImage({ image: 'photo.jpg', pixar_image: 'p.jpg' });
  assert.strictEqual(result, '/images/photo.jpg');
});

test('getProfileImage({image:"", pixar_image:"p.jpg"}) returns "/images/pixar/p.jpg"', () => {
  const result = utils.getProfileImage({ image: '', pixar_image: 'p.jpg' });
  assert.strictEqual(result, '/images/pixar/p.jpg');
});

test('getProfileImage with no image falls back to pixar', () => {
  const result = utils.getProfileImage({ image: null, pixar_image: 'fallback.jpg' });
  assert.strictEqual(result, '/images/pixar/fallback.jpg');
});

// Run all tests
run();
