'use strict';

/**
 * ws-client.js — Client-side WebSocket client with reconnection, backoff, and Safari recovery.
 * RTWS-03: Exponential backoff with jitter (1s base, 10s cap)
 * RTWS-06: visibilitychange reconnection for Safari screen lock
 */
const wsClient = (() => {
  let ws = null;
  let reconnectDelay = 1000;
  const MAX_RECONNECT_DELAY = 10000;
  const handlers = {};

  function getWsUrl() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const token = new URLSearchParams(location.search).get('token');
    return `${protocol}//${location.host}/ws?token=${token}`;
  }

  function dispatch(type, msg) {
    if (handlers[type]) {
      handlers[type].forEach((fn) => { try { fn(msg); } catch (e) { console.error('ws handler error:', e); } });
    }
  }

  function connect() {
    const url = getWsUrl();
    ws = new WebSocket(url);

    ws.onopen = () => {
      reconnectDelay = 1000;
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type) dispatch(msg.type, msg);
      } catch (e) { /* ignore malformed messages */ }
    };

    ws.onclose = () => {
      const delay = reconnectDelay + Math.random() * 1000;
      reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY);
      setTimeout(connect, delay);
    };

    ws.onerror = () => { /* onclose fires after onerror — reconnect handled there */ };
  }

  function on(type, fn) {
    if (!handlers[type]) handlers[type] = [];
    handlers[type].push(fn);
  }

  function send(msg) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  }

  // Safari screen lock recovery (RTWS-06)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && ws) {
      if (ws.readyState !== WebSocket.OPEN && ws.readyState !== WebSocket.CONNECTING) {
        reconnectDelay = 1000;
        connect();
      }
    }
  });

  return { connect, on, send };
})();
