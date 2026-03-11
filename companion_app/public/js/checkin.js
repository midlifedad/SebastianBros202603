'use strict';

/**
 * checkin.js — Check-in page logic.
 * Handles roster fetch, fuzzy search, confirmation card, check-in POST, and redirect to guide.
 *
 * Dependencies (loaded before this script):
 *   - auth.js (auth.token, auth.apiFetch, auth.buildUrl)
 *   - ws-client.js (wsClient.connect, wsClient.on)
 *   - utils.js (utils.createFuzzySearch, utils.getProfileImage)
 *   - fuse.min.js (Fuse constructor, used by utils.createFuzzySearch)
 */
(() => {
  // Bail if no token — auth.js already shows the "Missing token" message
  if (!auth.token) return;

  // --- DOM refs ---
  const searchView = document.getElementById('search-view');
  const confirmView = document.getElementById('confirm-view');
  const loadingView = document.getElementById('loading-view');
  const nameInput = document.getElementById('name-input');
  const suggestionsList = document.getElementById('suggestions');
  const confirmPhoto = document.getElementById('confirm-photo');
  const confirmName = document.getElementById('confirm-name');
  const confirmTitle = document.getElementById('confirm-title');
  const checkinBtn = document.getElementById('checkin-btn');
  const backBtn = document.getElementById('back-btn');

  // --- State ---
  let roster = [];
  let searcher = null;
  let selectedAttendee = null;
  const checkedInSet = new Set();

  // --- View helpers ---
  function showView(view) {
    searchView.classList.add('hidden');
    confirmView.classList.add('hidden');
    loadingView.classList.add('hidden');
    view.classList.remove('hidden');
  }

  // --- Suggestion rendering ---
  function renderSuggestions(results) {
    suggestionsList.innerHTML = '';
    results.forEach(item => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.dataset.id = item.id;

      if (checkedInSet.has(item.id)) {
        li.classList.add('checked-in');
      }

      const infoDiv = document.createElement('div');
      const nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.textContent = item.name;
      infoDiv.appendChild(nameDiv);
      li.appendChild(infoDiv);

      if (checkedInSet.has(item.id)) {
        const badge = document.createElement('span');
        badge.className = 'checked-badge';
        badge.textContent = 'Checked in';
        li.appendChild(badge);
      }

      li.addEventListener('click', () => onSuggestionTap(item.id));
      suggestionsList.appendChild(li);
    });
  }

  // --- Suggestion tap handler ---
  async function onSuggestionTap(id) {
    try {
      const res = await auth.apiFetch('/api/attendee/' + id);
      if (!res.ok) throw new Error('Failed to load profile');
      const attendee = await res.json();
      selectedAttendee = attendee;

      // Populate confirmation card
      confirmPhoto.src = utils.getProfileImage(attendee);
      confirmName.textContent = attendee.name;
      confirmTitle.textContent = attendee.title;

      showView(confirmView);
    } catch (err) {
      console.error('Error loading attendee:', err);
    }
  }

  // --- Check-in handler ---
  async function onCheckin() {
    if (!selectedAttendee) return;

    checkinBtn.disabled = true;
    checkinBtn.textContent = 'Checking in...';

    try {
      const res = await auth.apiFetch('/api/checkin', {
        method: 'POST',
        body: JSON.stringify({ attendeeId: selectedAttendee.id }),
      });

      if (!res.ok) throw new Error('Check-in failed');

      // Store for returning-attendee shortcut
      sessionStorage.setItem('checkedInId', selectedAttendee.id);

      // Redirect to guide
      location.href = auth.buildUrl('/guide.html', { id: selectedAttendee.id });
    } catch (err) {
      console.error('Check-in error:', err);
      checkinBtn.disabled = false;
      checkinBtn.textContent = 'Check In';

      // Show inline error
      let errorEl = confirmView.querySelector('.error-msg');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-msg';
        confirmView.querySelector('.confirm-card').appendChild(errorEl);
      }
      errorEl.textContent = 'Something went wrong. Please try again.';
    }
  }

  // --- Back to search ---
  function onBack() {
    selectedAttendee = null;
    showView(searchView);
    nameInput.focus();
  }

  // --- Input handler ---
  function onInput() {
    const value = nameInput.value.trim();
    if (value.length < 2) {
      suggestionsList.innerHTML = '';
      return;
    }
    const results = searcher.search(value);
    renderSuggestions(results);
  }

  // --- Initialization ---
  async function init() {
    // Check for returning attendee shortcut
    const savedId = sessionStorage.getItem('checkedInId');
    if (savedId) {
      location.href = auth.buildUrl('/guide.html', { id: savedId });
      return;
    }

    showView(loadingView);

    try {
      // Fetch roster
      const res = await auth.apiFetch('/api/attendees');
      if (!res.ok) throw new Error('Failed to load roster');
      roster = await res.json();

      // Initialize fuzzy search
      searcher = utils.createFuzzySearch(roster);

      // Connect WebSocket for real-time checked-in tracking
      wsClient.connect();

      wsClient.on('state:sync', (msg) => {
        checkedInSet.clear();
        if (msg.checkedIn && Array.isArray(msg.checkedIn)) {
          msg.checkedIn.forEach(a => checkedInSet.add(a.id));
        }
      });

      wsClient.on('checkin', (msg) => {
        if (msg.attendee && msg.attendee.id) {
          checkedInSet.add(msg.attendee.id);
        }
      });

      // Show search view
      showView(searchView);
      nameInput.focus();

    } catch (err) {
      console.error('Initialization error:', err);
      loadingView.innerHTML = '<p class="error-msg">Failed to load. Please refresh.</p>';
    }
  }

  // --- Event listeners ---
  nameInput.addEventListener('input', onInput);
  checkinBtn.addEventListener('click', onCheckin);
  backBtn.addEventListener('click', onBack);

  // --- Start ---
  init();
})();
