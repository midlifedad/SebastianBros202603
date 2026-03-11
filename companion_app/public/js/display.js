'use strict';

/**
 * display.js — Projector display page: QR code, live check-in feed, wake lock.
 * Loaded on /display.html with ADMIN_TOKEN as ?token= and eventToken as separate param.
 */
(function () {
  let checkedInCount = 0;
  let totalAttendees = 21;

  // --- Admin verification ---
  async function init() {
    try {
      const res = await auth.apiFetch('/api/admin/state');
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

    // --- Event token extraction ---
    const params = new URLSearchParams(location.search);
    const eventToken = params.get('eventToken');
    if (!eventToken) {
      document.body.innerHTML =
        '<p style="color:#ef4444;text-align:center;padding:2rem;">Missing eventToken parameter.</p>';
      return;
    }

    // --- QR code rendering ---
    const attendeeUrl = location.origin + '/?token=' + eventToken;
    QRCode.toCanvas(
      document.getElementById('qr-canvas'),
      attendeeUrl,
      { width: 400, margin: 2, color: { dark: '#000000', light: '#ffffff' }, errorCorrectionLevel: 'H' },
      function (err) {
        if (err) console.error('QR render error:', err);
      }
    );
    document.getElementById('qr-url').textContent = attendeeUrl;

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
    });

    // --- Check-in handler ---
    wsClient.on('checkin', function (msg) {
      checkedInCount++;
      updateCounter();
      var feed = document.getElementById('checkin-feed');
      feed.prepend(createCheckinCard(msg.attendee, true));
    });

    // --- Screen Wake Lock ---
    requestWakeLock();
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && !wakeLock) {
        requestWakeLock();
      }
    });

    // --- Connect WebSocket ---
    wsClient.connect();
  }

  // --- Card creation ---
  function createCheckinCard(attendee, animate) {
    var card = document.createElement('div');
    card.className = 'display-checkin-card';
    if (animate) {
      card.style.animation = 'cardEnter 0.3s ease-out';
    }

    var img = document.createElement('img');
    img.className = 'display-card-photo';
    img.src = '/images/pixar/' + attendee.pixar_image;
    img.alt = attendee.name;
    card.appendChild(img);

    var name = document.createElement('div');
    name.className = 'display-card-name';
    name.textContent = attendee.name;
    card.appendChild(name);

    var title = document.createElement('div');
    title.className = 'display-card-title';
    title.textContent = attendee.title;
    card.appendChild(title);

    return card;
  }

  // --- Counter update ---
  function updateCounter() {
    document.getElementById('checkin-counter').textContent =
      checkedInCount + ' of ' + totalAttendees + ' checked in';
  }

  // --- Screen Wake Lock ---
  var wakeLock = null;

  async function requestWakeLock() {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', function () {
        wakeLock = null;
      });
    } catch (e) {
      console.warn('Wake Lock not available:', e.message);
    }
  }

  // --- Start ---
  init();
})();
