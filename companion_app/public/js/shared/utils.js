'use strict';

/**
 * utils.js — Shared utilities for the companion app.
 * Provides fuzzy search wrapper, markdown renderer, and image path helper.
 *
 * Dependencies: Fuse.js (loaded via <script src="/vendor/fuse.min.js"> before this file)
 *
 * Exports (via global `utils` object):
 *   utils.createFuzzySearch(attendeeList) — returns { search(query) }
 *   utils.renderMarkdown(text) — returns HTML string
 *   utils.getProfileImage(attendee) — returns image URL path
 */
const utils = (() => {

  /**
   * Create a fuzzy search instance for the attendee roster.
   * @param {Array<{id: string, name: string}>} attendeeList
   * @returns {{ search: (query: string) => Array<{id: string, name: string}> }}
   */
  function createFuzzySearch(attendeeList) {
    const fuse = new Fuse(attendeeList, {
      keys: ['name'],
      threshold: 0.4,
      includeScore: true,
    });

    return {
      search(query) {
        if (!query || query.length < 2) return [];
        return fuse.search(query).slice(0, 5).map(r => r.item);
      }
    };
  }

  /**
   * Convert markdown text to HTML.
   * Handles 5 patterns found in attendee section data:
   *   - **bold** -> <strong>
   *   - [text](url) -> <a target="_blank">
   *   - # heading -> <h3> (offset +2)
   *   - - bullet -> <ul><li>
   *   - N) numbered -> <ol><li>
   *
   * @param {string} text — markdown source
   * @returns {string} — HTML string
   */
  function renderMarkdown(text) {
    if (!text) return '';

    // Pre-process: if text has no paragraph breaks but has semicolon-separated items,
    // split them into separate lines for proper rendering
    if (text.indexOf('\n\n') === -1 && (text.match(/;/g) || []).length >= 2) {
      text = text.replace(/;\s+/g, '\n\n');
    }

    // Escape HTML entities first (prevent XSS)
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Links: [text](url) -> <a href="url" target="_blank" rel="noopener noreferrer">text</a>
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Split into paragraphs on double newlines
    const paragraphs = html.split(/\n\n+/);

    return paragraphs.map(para => {
      const lines = para.split('\n');

      // Check if this paragraph is a bullet list
      const nonEmptyLines = lines.filter(l => l.trim() !== '');
      const isBulletList = nonEmptyLines.length > 0 &&
        nonEmptyLines.every(l => l.trim().startsWith('- '));

      if (isBulletList) {
        const items = nonEmptyLines
          .map(l => '<li>' + l.trim().substring(2) + '</li>');
        return '<ul>' + items.join('') + '</ul>';
      }

      // Check if this paragraph is a numbered list
      const isNumberedList = nonEmptyLines.length > 0 &&
        nonEmptyLines.every(l => /^\d+\)/.test(l.trim()));

      if (isNumberedList) {
        const items = nonEmptyLines
          .map(l => '<li>' + l.trim().replace(/^\d+\)\s*/, '') + '</li>');
        return '<ol>' + items.join('') + '</ol>';
      }

      // Check for headings (first line starting with #)
      if (lines[0] && /^#{1,3}\s/.test(lines[0].trim())) {
        const match = lines[0].trim().match(/^(#+)\s+(.*)/);
        if (match) {
          const level = Math.min(match[1].length + 2, 6); // offset +2, cap at h6
          const headingText = match[2];
          return '<h' + level + '>' + headingText + '</h' + level + '>';
        }
      }

      // Regular paragraph — single newlines become <br>
      return '<p>' + para.replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  /**
   * Get the profile image URL for an attendee.
   * Falls back to Pixar portrait if no real photo exists.
   *
   * @param {{ image: string, pixar_image: string }} attendee
   * @returns {string} — URL path to image
   */
  function getProfileImage(attendee) {
    if (attendee.pixar_image) return '/images/pixar/' + attendee.pixar_image;
    if (attendee.image) return '/images/' + attendee.image;
    return '/images/pixar/default.jpg';
  }

  return { createFuzzySearch, renderMarkdown, getProfileImage };
})();
