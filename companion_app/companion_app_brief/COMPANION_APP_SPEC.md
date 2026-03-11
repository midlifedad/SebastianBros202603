# The Wrong Rubric — Companion App Spec

**For:** Claude Code implementation  
**Event:** FinMa Family Reunion, Westin Whistler, March 12 2026  
**Hosting:** Railway (Node.js)  
**Concurrency:** 30 users  
**Auth:** Token-based via QR code URL parameter  

---

## 1. What This Is

A companion web app for live presentations. Each instance is tied to a specific event and audience. The presenter (Amir) shows a QR code during his talk. Attendees scan it, check in, and get a personalized mobile experience with AI resource guides tailored to their role. The presenter's screen shows check-ins as they happen. The app supports live polls triggered from the presentation.

The first instance is for the FinMa Family Reunion (March 12, 2026, Whistler) — but the app is designed to be reused for future presentations with different attendee data.

---

## 2. Architecture

```
┌─────────────────────────────────────────────────┐
│                    Railway                        │
│                                                   │
│   Node.js Server (Express)                        │
│   ├── Static files (HTML/CSS/JS/images)           │
│   ├── REST API (/api/*)                           │
│   ├── WebSocket (ws) — real-time sync             │
│   └── In-memory state (no database)               │
│                                                   │
│   Data: attendees.json baked in at build time      │
│   Images: /public/images/*.jpg                     │
│                                                   │
└─────────────────────────────────────────────────┘
         │
         │  HTTPS + WSS
         │
    ┌────┴────┐          ┌──────────┐
    │ Phones  │          │ Presenter│
    │ (25)    │          │ Screen   │
    └─────────┘          └──────────┘
```

### Why This Architecture

- **No database for v1.** 21 attendees for this instance. In-memory state keeps it simple. If the server restarts, check-ins reset — acceptable for now. A future version could add SQLite or similar if persistence matters.
- **WebSocket for real-time.** Check-ins and polls need to appear on the presenter screen instantly. SSE would also work but WebSocket is simpler for bidirectional (polls).
- **Single server.** Everything serves from one Express instance — static files, API, WebSocket. No build step needed for the frontend (vanilla HTML/CSS/JS, no framework).
- **Railway.** Deploy via `railway up` from the repo. Set `PORT` env var. Railway gives you HTTPS + WSS automatically.

### Auth Model

The QR code URL contains a token:
```
https://<app-url>/?token=<EVENT_TOKEN>
```

`EVENT_TOKEN` is a random string set as an env var on Railway. Every API request and WebSocket connection must include it. No user accounts, no passwords, no OAuth. If you have the token, you're in.

The presenter screen and display screen use a separate admin token:
```
https://<app-url>/presenter?token=<ADMIN_TOKEN>
https://<app-url>/display?token=<ADMIN_TOKEN>
```

Both tokens are env vars:
```
EVENT_TOKEN=<random-32-char>
ADMIN_TOKEN=<random-32-char>
PORT=3000
```

---

## 3. Data Model

### Attendee (baked into server at startup from `data/attendees.json`)

```json
{
  "id": "benjamin_kromayer",
  "name": "Benjamin Kromayer",
  "title": "Founder & CEO, Vanbruben GmbH",
  "image": "benjamin_kromayer.jpg",
  "pixar_image": "benjamin_kromayer_pixar.png",
  "linkedin_url": "https://www.linkedin.com/in/benjamin-kromayer-8242589",
  "ai_impact": "...",
  "ai_tools": "...",
  "agentic_frameworks": "...",
  "role_transformation": "...",
  "learning_resources": "...",
  "industry_use_cases": "..."
}
```

### Runtime State (in-memory)

```js
const state = {
  checkedIn: new Map(),    // id -> { name, title, image, pixar_image, checkedInAt }
  activePoll: null,        // { id, question, options: [...], votes: Map<optionIndex, Set<attendeeId>> }
  pollResults: [],         // completed polls
  presenterConnected: false
}
```

---

## 4. API Endpoints

All endpoints require `?token=<EVENT_TOKEN>` or `Authorization: Bearer <EVENT_TOKEN>`.

### `GET /api/attendees`
Returns the attendee roster for autocomplete. Minimal fields only:
```json
[
  { "id": "benjamin_kromayer", "name": "Benjamin Kromayer" },
  { "id": "mark_nelson", "name": "Mark Nelson" },
  ...
]
```

### `POST /api/checkin`
```json
{ "attendeeId": "benjamin_kromayer" }
```
Returns the full attendee profile. Broadcasts check-in to presenter via WebSocket.
Idempotent — checking in twice is fine, just returns the profile again.

### `GET /api/attendee/:id`
Returns full attendee profile (for the personalized resource guide pages).

### `GET /api/poll`
Returns current active poll (or null).
```json
{
  "id": "poll_1",
  "question": "How familiar are you with AI tools?",
  "options": ["Not at all", "Somewhat", "Very", "I build with them daily"],
  "myVote": null
}
```

### `POST /api/poll/vote`
```json
{ "pollId": "poll_1", "optionIndex": 2, "attendeeId": "benjamin_kromayer" }
```
One vote per attendee per poll. Broadcasts updated results to presenter.

### Admin-only (requires `ADMIN_TOKEN`):

### `POST /api/admin/poll`
Create/update the active poll. Broadcasts to all attendee clients.
```json
{
  "question": "How familiar are you with AI tools?",
  "options": ["Not at all", "Somewhat", "Very", "I build with them daily"]
}
```

### `POST /api/admin/poll/close`
Closes the active poll. Broadcasts final results to presenter.

### `GET /api/admin/state`
Returns full server state (check-ins, poll, etc.) for the presenter screen.

---

## 5. WebSocket Protocol

Single WebSocket endpoint at `/ws?token=<TOKEN>`.

### Messages (server → client)

```json
{ "type": "checkin", "attendee": { "id", "name", "title", "image", "pixar_image" } }
{ "type": "poll:new", "poll": { "id", "question", "options" } }
{ "type": "poll:update", "results": { "options": [...], "counts": [...], "total": N } }
{ "type": "poll:closed", "results": { ... } }
{ "type": "state:sync", "checkedIn": [...], "activePoll": {...} }
```

### Messages (client → server)

```json
{ "type": "ping" }
```

WebSocket is primarily server-push. Votes and check-ins go through REST (simpler error handling). WebSocket pushes the real-time updates.

### Reconnection

Client should reconnect on disconnect with exponential backoff (1s, 2s, 4s, max 10s). On reconnect, server sends `state:sync` with current state.

---

## 6. Page Structure

### Pages

| Path | View | Purpose |
|------|------|---------|
| `/` | Landing / Check-in | Name entry + confirm + check in |
| `/guide` | Resource Guide | Personalized AI resource pages |
| `/poll` | Live Poll | Vote on active poll |
| `/display` | QR Display Screen | Shown on projector — QR code + live animated check-in list |
| `/presenter` | Presenter Dashboard | Check-ins + poll control (admin) |

All pages are static HTML served by Express. No SPA framework — vanilla JS with fetch + WebSocket. Each page is a separate `.html` file. Navigation between guide sections is handled with show/hide on a single page (no route changes needed).

### File Structure

```
project/
├── server.js                 # Express + WebSocket server
├── package.json
├── data/
│   └── attendees.json        # Baked attendee data
├── public/
│   ├── index.html            # Check-in page
│   ├── guide.html            # Resource guide
│   ├── poll.html             # Poll voting
│   ├── display.html          # QR display screen (projector)
│   ├── presenter.html        # Presenter dashboard
│   ├── css/
│   │   └── style.css         # All styles
│   ├── js/
│   │   ├── checkin.js        # Check-in page logic
│   │   ├── guide.js          # Guide page logic
│   │   ├── poll.js           # Poll page logic
│   │   ├── display.js        # QR display screen logic
│   │   ├── presenter.js      # Presenter dashboard logic
│   │   └── ws.js             # Shared WebSocket client
│   └── images/
│       ├── benjamin_kromayer.jpg
│       ├── mark_nelson.jpg
│       ├── ...               # All attendee photos (18 JPGs)
│       └── pixar/
│           ├── benjamin_kromayer_pixar.png
│           ├── mark_nelson_pixar.png
│           └── ...           # Pixar-style portraits (21 PNGs)
├── test/
│   ├── load-test.js          # 30-user concurrency test
│   └── e2e-test.js           # End-to-end flow test
└── railway.json              # Railway config
```

---

## 7. User Flows

### Flow 1: Attendee Check-In

```
1. Scan QR code → opens /?token=<EVENT_TOKEN>
2. See input field: "Type your name"
3. As they type, fuzzy-matched suggestions appear (max 5)
4. Tap a suggestion → profile card appears with photo + title
5. "Yes, this is me" button
6. Hit "Check In" → 
   - Server records check-in
   - WebSocket broadcasts to presenter screen
   - Redirect to /guide?id=<attendeeId>&token=<TOKEN>
```

**Autocomplete behavior:**
- Starts matching after 2 characters
- Fuzzy match on first name, last name, or full name
- Case-insensitive
- Already-checked-in attendees show a subtle "✓ Checked in" indicator but are still selectable (idempotent)

### Flow 2: Personalized Resource Guide

```
1. Arrive at /guide with attendeeId
2. See welcome header: "Welcome, Benjamin" with their photo
3. Tab/section navigation:
   - "Your AI Impact" — how AI affects their specific role
   - "Tools" — recommended AI tools
   - "Agents & Frameworks" — agentic systems for their industry
   - "Your Role, Transformed" — what's changing in their daily work
   - "Learn" — podcasts, newsletters, courses, books
   - "Industry Cases" — how peers/competitors use AI
4. Each section renders the markdown-formatted content
5. Bottom nav: persistent tabs for Guide / Poll / Presentation
```

### Flow 3: Live Poll

```
1. Presenter creates poll via presenter dashboard (or API)
2. All connected attendee clients receive WebSocket push
3. Attendee phone shows poll notification / tab badge
4. Navigate to /poll → see question + options as tappable cards
5. Tap to vote → card highlights, vote submitted
6. See "Vote recorded" confirmation
7. When presenter closes poll → results animate in on presenter screen
```

### Flow 4: QR Display Screen

```
1. Open /display?token=<ADMIN_TOKEN> on the projector/presentation screen
2. Full-screen dark cinematic view, centered layout
3. Left side: Large QR code
   - Dynamically generated (e.g. using qrcode.js or a lightweight QR library)
   - Points to https://<app-url>/?token=<EVENT_TOKEN>
   - White on dark, sized for scanning from 15ft+
   - URL displayed below in JetBrains Mono at small size
4. Right side: Animated check-in list
   - Uses Inspira UI "Animated List" component pattern
   - As attendees check in, their name + Pixar portrait + title animate in
   - Smooth staggered entrance animation (fade up + slide)
   - Most recent check-in at top
   - Running count: "4 of 21 checked in" (Cormorant Garamond counter)
5. WebSocket connection receives check-in broadcasts in real time
6. This is the page shown during the QR code moment in the presentation
```

**Inspira UI Animated List reference:**
Use the Animated List component from Inspira UI (https://inspira-ui.com). The component shows items appearing with a smooth, staggered animation. Implement the animation pattern in vanilla JS/CSS to avoid framework dependencies — the key behavior is:
- New items slide in from below with opacity fade
- Each item staggers slightly after the previous
- Items have a subtle scale entrance (0.95 → 1.0)
- Smooth spring-like easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Flow 5: Presenter Dashboard

```
1. Open /presenter?token=<ADMIN_TOKEN>
2. Full-screen dark view optimized for laptop (not projected)
3. Left side: Check-in feed — attendee cards appear as people scan
   - Pixar portrait, name, title
   - Animated entrance (fade up + scale)
   - Running count: "12 of 21 checked in"
4. Right side: Poll control panel
   - Create poll: question + options (2-4)
   - Launch poll → pushes to all clients
   - Live vote count updating in real-time
   - Close poll → final results display
5. Bottom: minimal status bar (WebSocket connection, attendee count)
```

---

## 8. Style Guide

The companion app inherits the presentation's design language — dark, editorial, cinematic. It should feel like it was born from the same visual universe as the slides.

### Design Tokens

```css
:root {
  /* ── Backgrounds ── */
  --bg:              #0a0a0f;
  --bg-soft:         #12121a;
  --bg-card:         #1a1a26;
  --bg-surface:      #22222e;

  /* ── Text ── */
  --text:            #f0ece4;
  --text-muted:      #8a8698;
  --text-dim:        #5a5668;

  /* ── Accent ── */
  --accent:          #f59e0b;     /* Amber */
  --accent-glow:     rgba(245, 158, 11, 0.15);
  --accent-subtle:   rgba(245, 158, 11, 0.08);

  /* ── Extended palette (for polls, charts) ── */
  --color-red:       #ef4444;
  --color-coral:     #f97316;
  --color-blue:      #3b82f6;
  --color-teal:      #14b8a6;
  --color-green:     #22c55e;
  --color-violet:    #8b5cf6;

  /* ── Spacing (mobile-optimized) ── */
  --space-xs:        0.25rem;     /* 4px */
  --space-sm:        0.5rem;      /* 8px */
  --space-md:        0.75rem;     /* 12px */
  --space-lg:        1rem;        /* 16px */
  --space-xl:        1.5rem;      /* 24px */
  --space-2xl:       2rem;        /* 32px */
  --space-3xl:       3rem;        /* 48px */

  /* ── Radii ── */
  --radius-sm:       6px;
  --radius-md:       10px;
  --radius-lg:       16px;
  --radius-full:     9999px;

  /* ── Shadows ── */
  --shadow-card:     0 2px 8px rgba(0,0,0,0.3), 0 0 1px rgba(245,158,11,0.1);
  --shadow-glow:     0 0 20px rgba(245,158,11,0.15);

  /* ── Transitions ── */
  --ease-primary:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-snappy:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   500ms;
}
```

### Typography

Three fonts, matching the presentation exactly:

| Font | Weight | Use | Fallback |
|------|--------|-----|----------|
| **Cormorant Garamond** | 400, 400i | Headings, display text, quotes | Georgia, serif |
| **Plus Jakarta Sans** | 300, 400, 500, 600 | Body text, UI elements | system-ui, sans-serif |
| **JetBrains Mono** | 400 | Labels, tags, mono accents | monospace |

Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Mobile Type Scale

| Element | Font | Size | Weight | Color | Letter-spacing |
|---------|------|------|--------|-------|----------------|
| Page title | Cormorant Garamond | 2rem (32px) | 400 | --text | normal |
| Section heading | Cormorant Garamond | 1.5rem (24px) | 400 | --text | normal |
| Card title | Plus Jakarta Sans | 1rem (16px) | 600 | --text | normal |
| Body | Plus Jakarta Sans | 0.9375rem (15px) | 300 | --text-muted | normal |
| Body small | Plus Jakarta Sans | 0.8125rem (13px) | 300 | --text-muted | normal |
| Tag / Label | JetBrains Mono | 0.6875rem (11px) | 400 | --accent | 0.08em, uppercase |
| Stat number | Cormorant Garamond | 3rem (48px) | 400 | --accent | normal |
| Input text | Plus Jakarta Sans | 1rem (16px) | 400 | --text | normal |
| Button | Plus Jakarta Sans | 0.9375rem (15px) | 500 | --bg | normal |

### Component Styles

#### Input Field
```css
.input {
  background: var(--bg-surface);
  border: 1px solid rgba(138, 134, 152, 0.2);
  border-radius: var(--radius-md);
  padding: var(--space-lg) var(--space-xl);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: var(--text);
  width: 100%;
  transition: border-color var(--duration-normal) var(--ease-primary);
}
.input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}
.input::placeholder {
  color: var(--text-dim);
}
```

#### Primary Button
```css
.btn-primary {
  background: var(--accent);
  color: var(--bg);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  padding: var(--space-lg) var(--space-2xl);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  width: 100%;
  transition: all var(--duration-normal) var(--ease-primary);
}
.btn-primary:active {
  transform: scale(0.97);
  background: #d97706;
}
.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

#### Card
```css
.card {
  background: var(--bg-card);
  border: 1px solid rgba(138, 134, 152, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-card);
}
.card--active {
  border-color: rgba(245, 158, 11, 0.3);
}
```

#### Tag / Label
```css
.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}
```

#### Avatar
```css
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-glow);
}
.avatar--large {
  width: 96px;
  height: 96px;
}
/* Fallback for missing images — initials on dark bg */
.avatar-fallback {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-surface);
  border: 2px solid var(--accent-glow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  color: var(--text-muted);
}
```

#### Autocomplete Dropdown
```css
.autocomplete-list {
  background: var(--bg-soft);
  border: 1px solid rgba(138, 134, 152, 0.15);
  border-radius: var(--radius-md);
  margin-top: var(--space-xs);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.autocomplete-item {
  padding: var(--space-lg) var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  cursor: pointer;
  transition: background var(--duration-fast);
  border-bottom: 1px solid rgba(138, 134, 152, 0.06);
}
.autocomplete-item:last-child {
  border-bottom: none;
}
.autocomplete-item:active,
.autocomplete-item.selected {
  background: rgba(245, 158, 11, 0.08);
}
.autocomplete-item .name {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
}
.autocomplete-item .title {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

#### Tab Navigation
```css
.tab-bar {
  display: flex;
  gap: 0;
  background: var(--bg-soft);
  border-top: 1px solid rgba(138, 134, 152, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
}
.tab {
  flex: 1;
  padding: var(--space-md) 0;
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-decoration: none;
  transition: color var(--duration-normal);
  position: relative;
}
.tab.active {
  color: var(--accent);
}
.tab.active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 25%;
  right: 25%;
  height: 2px;
  background: var(--accent);
}
.tab .badge {
  position: absolute;
  top: 4px;
  right: calc(50% - 20px);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s infinite;
}
```

#### Poll Option Card
```css
.poll-option {
  background: var(--bg-card);
  border: 1px solid rgba(138, 134, 152, 0.15);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-primary);
  text-align: center;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: var(--text);
}
.poll-option:active {
  transform: scale(0.97);
}
.poll-option.selected {
  border-color: var(--accent);
  background: rgba(245, 158, 11, 0.08);
  box-shadow: var(--shadow-glow);
}
.poll-option.selected::after {
  content: '✓';
  display: block;
  margin-top: var(--space-sm);
  color: var(--accent);
  font-size: 1.25rem;
}
```

### Layout Principles

- **Mobile-first.** Phones are the primary device. Max content width: `420px`, centered.
- **Generous padding.** `--space-xl` (24px) on page sides minimum.
- **Dark everywhere.** `--bg` on body. No white anywhere.
- **Amber accent sparingly.** Tags, active states, focus rings, progress bars. Never as large background fills.
- **Safe area.** Bottom navigation must respect `env(safe-area-inset-bottom)` for notched phones.
- **No scroll-jank.** All scrollable content uses `-webkit-overflow-scrolling: touch` and `overscroll-behavior: contain`.

### Page Layout Template

```css
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-weight: 300;
  margin: 0;
  min-height: 100dvh;
  -webkit-font-smoothing: antialiased;
}
.page {
  max-width: 420px;
  margin: 0 auto;
  padding: var(--space-xl);
  padding-bottom: calc(60px + env(safe-area-inset-bottom) + var(--space-xl));
}
```

### Animations

Keep it minimal but polished:

```css
/* Check-in card entrance on presenter screen */
@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.checkin-card-enter {
  animation: card-enter 0.5s var(--ease-primary) forwards;
}

/* Poll badge pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Vote confirmation */
@keyframes vote-confirm {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

### Presenter Screen (Special Layout)

The presenter screen is designed for a laptop/projector, not mobile. It uses the full viewport:

```css
/* Presenter screen — full viewport, dark, cinematic */
.presenter-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  height: 100vh;
  background: var(--bg);
  overflow: hidden;
}
.presenter-checkins {
  padding: var(--space-3xl);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: var(--space-xl);
  overflow-y: auto;
}
.presenter-sidebar {
  background: var(--bg-soft);
  border-left: 1px solid rgba(138, 134, 152, 0.1);
  padding: var(--space-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}
/* Presenter check-in card */
.presenter-card {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-lg);
  background: var(--bg-card);
  border: 1px solid rgba(138, 134, 152, 0.08);
  border-radius: var(--radius-md);
  width: 280px;
}
/* Counter */
.presenter-counter {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 3rem;
  color: var(--accent);
}
.presenter-counter-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
}
```

### Poll Results (Presenter Screen)

```css
.poll-bar-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.poll-bar {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}
.poll-bar-label {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 0.875rem;
  color: var(--text-muted);
  min-width: 120px;
}
.poll-bar-fill {
  height: 32px;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--accent), #d97706);
  transition: width 0.6s var(--ease-primary);
  display: flex;
  align-items: center;
  padding-left: var(--space-md);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--bg);
}
```

---

## 9. Presenter Poll Control

The presenter dashboard has a simple poll creation UI:

1. Text input for question
2. 2-4 option inputs (add/remove buttons)
3. "Launch Poll" button → creates poll, pushes to all clients
4. While poll is live: see real-time vote counts + bar chart
5. "Close Poll" button → finalizes results, announces to clients

Polls are simple — no timers, no anonymous mode. One vote per attendee, identified by their `attendeeId`.

### Poll Hook for Presentation

The presenter can also trigger polls from outside the dashboard by hitting the API:

```bash
# From a script, Slidev component, or curl
curl -X POST https://<app>/api/admin/poll \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"question": "How familiar are you with AI?", "options": ["Not at all", "Somewhat", "Very", "I build with them"]}'
```

This means a Slidev slide can embed an iframe or script that fires a poll when the slide is reached. Or Amir can just create it from the presenter dashboard. Either works.

---

## 10. Testing Plan

### `test/load-test.js` — Concurrency Test

Simulates 30 concurrent WebSocket connections + interleaved REST calls:

```
1. Connect 30 WebSocket clients (verify all connect)
2. Fire 21 check-ins in rapid sequence (200ms apart)
3. Verify all 30 clients receive all 21 check-in broadcasts
4. Create a poll
5. Fire 21 votes (one per "attendee") simultaneously
6. Verify presenter client receives all vote updates
7. Close poll, verify final results
8. Disconnect all clients
9. Report: latency p50/p95/p99, any dropped messages, any errors
```

Target: all operations complete in <2s total, zero dropped messages.

### `test/e2e-test.js` — Flow Test

Tests the full user journey:

```
1. GET / without token → 401
2. GET /?token=<valid> → 200, check-in page
3. GET /api/attendees?token=<valid> → 21 attendees
4. POST /api/checkin with valid attendeeId → 200, full profile
5. POST /api/checkin with same attendeeId → 200 (idempotent)
6. POST /api/checkin with invalid attendeeId → 404
7. GET /api/attendee/:id → full profile
8. POST /api/admin/poll with EVENT_TOKEN → 403 (not admin)
9. POST /api/admin/poll with ADMIN_TOKEN → 200, poll created
10. POST /api/poll/vote → 200
11. POST /api/poll/vote again (same attendee) → 409 (already voted)
12. POST /api/admin/poll/close → 200, results returned
13. GET /api/poll after close → null (no active poll)
```

### Manual Test Checklist

```
[ ] QR code → opens check-in page on iPhone
[ ] Name autocomplete works with partial input ("Sha" → "Shane Leech-Porter")
[ ] Check-in appears on presenter screen within 1s
[ ] Resource guide sections all render correctly
[ ] Poll notification appears on attendee phone
[ ] Vote registers and shows confirmation
[ ] Presenter sees live vote counts
[ ] Works on Safari iOS, Chrome Android
[ ] Works on hotel WiFi (test with throttled connection)
[ ] 16pt minimum touch targets on all interactive elements
[ ] /display page QR code scans correctly from phone camera at 15ft
[ ] /display page animated list shows check-ins in real time
[ ] /display page looks cinematic on projector resolution (1920x1080)
```

---

## 11. Railway Deployment

### `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

### `package.json`
```json
{
  "name": "wrong-rubric-companion",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "test": "node test/e2e-test.js",
    "test:load": "node test/load-test.js"
  },
  "dependencies": {
    "express": "^4.21.0",
    "ws": "^8.18.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### Environment Variables (set on Railway)

```
PORT=3000
EVENT_TOKEN=<generate-random-32-char-string>
ADMIN_TOKEN=<generate-different-random-32-char-string>
```

### Deploy Steps

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Create project
railway init

# 4. Set env vars
railway variables set EVENT_TOKEN=$(openssl rand -hex 16)
railway variables set ADMIN_TOKEN=$(openssl rand -hex 16)

# 5. Deploy
railway up

# 6. Get URL
railway domain
```

---

## 12. Data Preparation

The `data/attendees.json` file is derived from the research in `companion_app/attendees_data.json`. Transform it to the app schema:

```js
// Each entry should look like:
{
  "id": "benjamin_kromayer",        // slug from filename
  "name": "Benjamin Kromayer",
  "title": "Founder & CEO, Vanbruben GmbH",  // shortened
  "image": "benjamin_kromayer.jpg",       // real photo (or null for 3 Sebastians)
  "pixar_image": "benjamin_kromayer_pixar.png",  // Pixar portrait (all 21 have one)
  "linkedin_url": "https://...",
  "sections": {
    "ai_impact": "...",              // rendered as markdown
    "ai_tools": "...",
    "agentic_frameworks": "...",
    "role_transformation": "...",
    "learning_resources": "...",
    "industry_use_cases": "..."
  }
}
```

Images go in `public/images/`. Pixar-style portraits go in `public/images/pixar/`. Every attendee has a Pixar portrait (21/21). The 3 Sebastians (Dirk, Christiane, Finn) don't have real photos — their Pixar portraits are Incredibles-style German-themed superhero characters as a playful touch.

The `/display` page and `/presenter` page should use `pixar_image` for check-in cards (more fun and visually consistent). The `/guide` page uses the real `image` for the welcome header, falling back to `pixar_image` if no real photo exists.

---

## 13. QR Code & Display Screen

The QR code is not a static slide image — it's rendered live by the `/display` page. During the presentation, the projector shows `/display?token=<ADMIN_TOKEN>`, which:

1. **Generates the QR code client-side** using a lightweight library (e.g., `qrcode-generator` or `qr.js` — no heavy dependencies). The QR encodes:
   ```
   https://<railway-domain>/?token=<EVENT_TOKEN>
   ```
2. **Shows a live check-in feed** using the Inspira UI Animated List pattern (see Flow 4 above).

The QR code should be:
- White modules on `--bg` (#0a0a0f) background
- Large enough to scan from 15ft in a conference room
- No logo in the center (keeps it scannable)
- The URL displayed below the QR in `JetBrains Mono` at `--text-dim` color

The QR library should be included as a vendored script in `public/js/` (no CDN dependency — hotel WiFi is unreliable). Recommended: `qrcode-generator` (~3KB minified).

---

## 14. Edge Cases

| Scenario | Handling |
|----------|----------|
| Same person scans twice | Idempotent check-in, returns their profile again |
| Person not in roster types name | Show "No matches found" — input stays open |
| WebSocket disconnects mid-poll | Reconnect + state:sync catches them up |
| Server restarts during event | In-memory state lost — attendees re-check-in. Acceptable for v1; could add persistence later |
| Slow hotel WiFi | Keep payload sizes small (<50KB). Images are pre-loaded on check-in page |
| No one scans the QR code | Presenter screen shows "Waiting for check-ins..." — not an error state |
| Token leaked | Attendees are a known group. Rotate tokens between events. Risk is low. |
| Poll created with no one online | Poll stays active until closed. Late joiners see it. |

---

## 15. Non-Requirements (v1)

- No database for v1 (in-memory is fine)
- No user accounts or persistent sessions
- No analytics or tracking
- No email notifications
- No file uploads
- No admin UI for managing attendees (data is baked in per instance)
- No offline support
- No PWA / service worker
- No portrait generation (separate feature, future)
- No presentation sync / slide following (deferred)
- No dark/light mode toggle (always dark)

---

## 16. Reference Files

These files are the data source. They're in the workspace at `/home/user/workspace/companion_app/`:

| File | Contents |
|------|----------|
| `attendees_data.json` | Full research data for all 21 attendees (13 fields each) |
| `attendees/*.md` | Individual markdown profiles (21 files) |
| `images/*.jpg` | Profile photos (18 of 21) |
| `images/pixar/*.png` | Pixar-style portraits (21 of 21 — all attendees) |
| `attendee_index.md` | Master index with relationship clusters |
| `TEMPLATE_GUIDE.md` | Full slide design system (style guide source) |

All of these files are included in the handoff zip alongside this spec. The `data/attendees.json` in the zip is already transformed to the app schema and ready to drop into the project.
