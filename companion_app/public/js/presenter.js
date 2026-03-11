'use strict';

/**
 * presenter.js — Presenter dashboard: check-in feed + poll creation/control.
 * Loaded on /presenter.html with ADMIN_TOKEN as ?token= param.
 */
(function () {
  var checkedInCount = 0;
  var totalAttendees = 21;
  var currentPoll = null;

  // --- Admin verification ---
  async function init() {
    try {
      var res = await auth.apiFetch('/api/admin/state');
      if (!res.ok) {
        document.body.innerHTML =
          '<p style="color:#ef4444;text-align:center;padding:2rem;">Admin access required.</p>';
        return;
      }
    } catch (e) {
      document.body.innerHTML =
        '<p style="color:#ef4444;text-align:center;padding:2rem;">Failed to verify admin access.</p>';
      return;
    }

    // --- State sync handler ---
    wsClient.on('state:sync', function (msg) {
      checkedInCount = msg.checkedInCount || 0;
      totalAttendees = msg.totalAttendees || 21;
      updateCounter();

      // Render existing checked-in attendees (no animation for initial load)
      var feed = document.getElementById('checkin-feed');
      feed.innerHTML = '';
      if (msg.checkedIn && msg.checkedIn.length > 0) {
        msg.checkedIn.forEach(function (attendee) {
          feed.appendChild(createCheckinCard(attendee, false));
        });
      }

      // If there's an active poll, show it
      if (msg.activePoll) {
        currentPoll = msg.activePoll;
        showActivePollView(msg.activePoll);
      }
    });

    // --- Check-in handler ---
    wsClient.on('checkin', function (msg) {
      checkedInCount++;
      updateCounter();
      var feed = document.getElementById('checkin-feed');
      feed.prepend(createCheckinCard(msg.attendee, true));
    });

    // --- Poll update handler (admin-only broadcast) ---
    wsClient.on('poll:update', function (msg) {
      renderBars(msg.results, 'poll-bars-container');
      document.getElementById('poll-total-votes').textContent =
        msg.results.total + ' vote' + (msg.results.total !== 1 ? 's' : '');
    });

    // --- Poll closed handler ---
    wsClient.on('poll:closed', function (msg) {
      currentPoll = null;
      showResultsView(msg.results);
    });

    // --- Set up poll creation UI ---
    setupPollControls();

    // --- Connect WebSocket ---
    wsClient.connect();
  }

  // --- Card creation ---
  function createCheckinCard(attendee, animate) {
    var card = document.createElement('div');
    card.className = 'presenter-checkin-card';
    if (animate) {
      card.style.animation = 'cardEnter 0.3s ease-out';
    }

    var img = document.createElement('img');
    img.className = 'display-card-photo';
    img.src = '/images/pixar/' + attendee.pixar_image;
    img.alt = attendee.name;
    card.appendChild(img);

    var info = document.createElement('div');

    var name = document.createElement('div');
    name.className = 'display-card-name';
    name.textContent = attendee.name;
    info.appendChild(name);

    var title = document.createElement('div');
    title.className = 'display-card-title';
    title.textContent = attendee.title;
    info.appendChild(title);

    card.appendChild(info);
    return card;
  }

  // --- Counter update ---
  function updateCounter() {
    document.getElementById('checkin-counter').textContent =
      checkedInCount + ' of ' + totalAttendees + ' checked in';
  }

  // --- Poll controls setup ---
  function setupPollControls() {
    var addOptionBtn = document.getElementById('add-option-btn');
    var launchPollBtn = document.getElementById('launch-poll-btn');
    var closePollBtn = document.getElementById('close-poll-btn');
    var closeConfirmBtn = document.getElementById('close-confirm-btn');
    var closeCancelBtn = document.getElementById('close-cancel-btn');
    var newPollBtn = document.getElementById('new-poll-btn');

    // Add option button
    addOptionBtn.addEventListener('click', function () {
      var container = document.getElementById('poll-options-container');
      var inputs = container.querySelectorAll('.poll-option-input');
      if (inputs.length >= 4) return;
      var newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.className = 'poll-input poll-option-input';
      newInput.placeholder = 'Option ' + (inputs.length + 1);
      newInput.setAttribute('data-index', inputs.length);
      container.appendChild(newInput);
      if (inputs.length + 1 >= 4) {
        addOptionBtn.classList.add('hidden');
      }
    });

    // Launch poll button
    launchPollBtn.addEventListener('click', async function () {
      var errorEl = document.getElementById('poll-error');
      errorEl.classList.add('hidden');
      errorEl.textContent = '';

      var question = document.getElementById('poll-question').value.trim();
      var optionInputs = document.querySelectorAll('.poll-option-input');
      var options = [];
      optionInputs.forEach(function (input) {
        var val = input.value.trim();
        if (val) options.push(val);
      });

      // Validate
      if (!question) {
        errorEl.textContent = 'Question is required.';
        errorEl.classList.remove('hidden');
        return;
      }
      if (options.length < 2) {
        errorEl.textContent = 'At least 2 non-empty options are required.';
        errorEl.classList.remove('hidden');
        return;
      }

      try {
        var res = await auth.apiFetch('/api/admin/poll', {
          method: 'POST',
          body: JSON.stringify({ question: question, options: options }),
        });
        if (res.status === 201) {
          var data = await res.json();
          currentPoll = data.poll;
          showActivePollView(data.poll);
        } else {
          var err = await res.json();
          errorEl.textContent = err.error || 'Failed to create poll.';
          errorEl.classList.remove('hidden');
        }
      } catch (e) {
        errorEl.textContent = 'Network error. Please try again.';
        errorEl.classList.remove('hidden');
      }
    });

    // Close poll button (step 1: show confirmation)
    closePollBtn.addEventListener('click', function () {
      document.getElementById('close-confirm').classList.remove('hidden');
    });

    // Confirm close (step 2: actually close)
    closeConfirmBtn.addEventListener('click', async function () {
      try {
        await auth.apiFetch('/api/admin/poll/close', { method: 'POST' });
        // The poll:closed WebSocket message will trigger showResultsView
      } catch (e) {
        console.error('Failed to close poll:', e);
      }
    });

    // Cancel close
    closeCancelBtn.addEventListener('click', function () {
      document.getElementById('close-confirm').classList.add('hidden');
    });

    // New poll button
    newPollBtn.addEventListener('click', function () {
      resetToCreateView();
    });
  }

  // --- View transitions ---
  function showActivePollView(poll) {
    document.getElementById('poll-create-view').classList.add('hidden');
    document.getElementById('poll-results-view').classList.add('hidden');
    document.getElementById('poll-active-view').classList.remove('hidden');
    document.getElementById('active-poll-question').textContent = poll.question;
    document.getElementById('close-confirm').classList.add('hidden');

    // Render initial bars with zero counts
    renderBars({
      options: poll.options,
      counts: poll.options.map(function () { return 0; }),
      total: 0,
    }, 'poll-bars-container');
    document.getElementById('poll-total-votes').textContent = '0 votes';
  }

  function showResultsView(results) {
    document.getElementById('poll-active-view').classList.add('hidden');
    document.getElementById('poll-create-view').classList.add('hidden');
    document.getElementById('poll-results-view').classList.remove('hidden');
    document.getElementById('results-question').textContent = results.question;
    renderBars(results, 'results-bars-container');
    document.getElementById('results-total').textContent =
      results.total + ' total vote' + (results.total !== 1 ? 's' : '');
  }

  function resetToCreateView() {
    document.getElementById('poll-results-view').classList.add('hidden');
    document.getElementById('poll-active-view').classList.add('hidden');
    document.getElementById('poll-create-view').classList.remove('hidden');

    // Clear inputs
    document.getElementById('poll-question').value = '';
    var container = document.getElementById('poll-options-container');
    var inputs = container.querySelectorAll('.poll-option-input');
    // Remove extra option inputs beyond the first 2
    for (var i = inputs.length - 1; i >= 2; i--) {
      inputs[i].remove();
    }
    // Clear remaining inputs
    container.querySelectorAll('.poll-option-input').forEach(function (input) {
      input.value = '';
    });

    // Show add option button again
    document.getElementById('add-option-btn').classList.remove('hidden');

    // Clear error
    var errorEl = document.getElementById('poll-error');
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
  }

  // --- Bar chart rendering ---
  function renderBars(results, containerId) {
    var container = document.getElementById(containerId);
    container.innerHTML = '';

    var maxCount = Math.max.apply(null, results.counts.concat([1])); // at least 1 to avoid division by zero

    results.options.forEach(function (option, i) {
      var count = results.counts[i] || 0;
      var pct = (count / maxCount) * 100;

      var row = document.createElement('div');
      row.className = 'poll-bar-row';

      var label = document.createElement('div');
      label.className = 'poll-bar-label';
      label.textContent = option;
      row.appendChild(label);

      var track = document.createElement('div');
      track.className = 'poll-bar-track';

      var bar = document.createElement('div');
      bar.className = 'poll-bar';
      bar.style.width = (count === 0 ? '2px' : pct + '%');
      track.appendChild(bar);
      row.appendChild(track);

      var countEl = document.createElement('div');
      countEl.className = 'poll-bar-count';
      countEl.textContent = count;
      row.appendChild(countEl);

      container.appendChild(row);
    });
  }

  // --- Start ---
  init();
})();
