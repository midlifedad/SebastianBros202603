'use strict';

/**
 * poll.js — Attendee poll voting page.
 * Single-tap voting with optimistic UI, WS-driven poll lifecycle.
 *
 * Dependencies (loaded before this script):
 *   - auth.js (auth.token, auth.apiFetch, auth.buildUrl)
 *   - ws-client.js (wsClient.connect, wsClient.on)
 */
(() => {
  // Bail if no token — auth.js already shows the "Missing token" message
  if (!auth.token) return;

  // --- Check for attendee ID (must have checked in) ---
  const attendeeId = sessionStorage.getItem('checkedInId');
  if (!attendeeId) {
    document.getElementById('checkin-link').href = auth.buildUrl('/');
    showView('needs-checkin-view');
    return;
  }

  // --- Set Guide tab link ---
  document.getElementById('tab-guide').href = auth.buildUrl('/guide.html', { id: attendeeId });

  // --- State ---
  let currentPoll = null;
  let hasVoted = false;

  // --- View switching ---
  function showView(viewId) {
    const views = ['needs-checkin-view', 'waiting-view', 'poll-view', 'voted-view', 'results-view'];
    views.forEach(id => {
      const el = document.getElementById(id);
      if (id === viewId) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  // --- Render voting options ---
  function renderOptions() {
    document.getElementById('poll-question').textContent = currentPoll.question;
    const container = document.getElementById('poll-options');
    container.innerHTML = '';

    currentPoll.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'poll-option-card';
      btn.textContent = option;
      btn.addEventListener('click', () => onVote(index));
      container.appendChild(btn);
    });
  }

  // --- Vote handler (optimistic UI) ---
  async function onVote(optionIndex) {
    // Immediately disable all option buttons
    const buttons = document.querySelectorAll('.poll-option-card');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      btn.classList.add('disabled');
      btn.style.pointerEvents = 'none';
      if (i === optionIndex) {
        btn.classList.add('selected');
      }
    });
    hasVoted = true;

    try {
      const res = await auth.apiFetch('/api/poll/vote', {
        method: 'POST',
        body: JSON.stringify({
          pollId: currentPoll.id,
          attendeeId: attendeeId,
          optionIndex: optionIndex,
        }),
      });

      if (res.ok) {
        document.getElementById('voted-option-text').textContent =
          'You voted: ' + currentPoll.options[optionIndex];
        showView('voted-view');
      } else if (res.status === 409) {
        document.getElementById('voted-option-text').textContent =
          "You've already voted on this poll.";
        showView('voted-view');
      } else {
        // Re-enable on unexpected error
        buttons.forEach(btn => {
          btn.disabled = false;
          btn.classList.remove('disabled');
          btn.style.pointerEvents = '';
        });
        hasVoted = false;
      }
    } catch (e) {
      // Re-enable on network error
      buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('disabled');
        btn.style.pointerEvents = '';
      });
      hasVoted = false;
    }
  }

  // --- Render bar chart for results ---
  function renderResultsBars(results) {
    const container = document.getElementById('results-bars');
    container.innerHTML = '';

    const maxCount = Math.max.apply(null, results.counts.concat([1]));

    results.options.forEach((option, i) => {
      const count = results.counts[i] || 0;
      const pct = (count / maxCount) * 100;

      const row = document.createElement('div');
      row.className = 'poll-bar-row';

      const label = document.createElement('div');
      label.className = 'poll-bar-label';
      label.textContent = option;
      row.appendChild(label);

      const track = document.createElement('div');
      track.className = 'poll-bar-track';

      const bar = document.createElement('div');
      bar.className = 'poll-bar';
      bar.style.width = (count === 0 ? '2px' : pct + '%');
      track.appendChild(bar);
      row.appendChild(track);

      const countEl = document.createElement('div');
      countEl.className = 'poll-bar-count';
      countEl.textContent = count;
      row.appendChild(countEl);

      container.appendChild(row);
    });
  }

  // --- WebSocket handlers ---
  wsClient.on('state:sync', msg => {
    if (msg.activePoll) {
      currentPoll = msg.activePoll;
      renderOptions();
      showView('poll-view');
    } else {
      showView('waiting-view');
    }
  });

  wsClient.on('poll:new', msg => {
    currentPoll = msg.poll;
    hasVoted = false;
    renderOptions();
    showView('poll-view');
  });

  wsClient.on('poll:closed', msg => {
    showView('results-view');
    document.getElementById('results-question').textContent = msg.results.question;
    renderResultsBars(msg.results);
    document.getElementById('results-total').textContent = msg.results.total + ' votes';
    currentPoll = null;
    hasVoted = false;
  });

  // --- Init: show waiting view and connect WebSocket ---
  showView('waiting-view');
  wsClient.connect();
})();
