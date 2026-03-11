'use strict';

/**
 * auth.js — Client-side token extraction and authenticated fetch wrapper.
 * Extracts token from URL query params, provides apiFetch() and buildUrl() helpers.
 */
const auth = (() => {
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  if (!token) {
    document.body.innerHTML =
      '<p style="color:#8a8698;text-align:center;padding:2rem;">'
      + 'Missing token. Scan the QR code to get started.</p>';
  }

  function apiFetch(url, options = {}) {
    const sep = url.includes('?') ? '&' : '?';
    return fetch(`${url}${sep}token=${token}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  }

  function buildUrl(path, extraParams = {}) {
    const p = new URLSearchParams({ token, ...extraParams });
    return `${path}?${p}`;
  }

  return { token, apiFetch, buildUrl };
})();
