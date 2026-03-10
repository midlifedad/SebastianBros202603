<!-- ============================================================
     SLIDES 6-7 DRAFT — Section 1: "A New Medium"

     DESIGN RATIONALE:

     Slide 6 (QR Code — Live Application):
     The emotional HIGH POINT of Section 1. Everything before this was
     escalation (Google → ChatGPT → Deep Research → Fully Agentic).
     Now the audience experiences it firsthand. Design choices:
     - slide-grid split: QR on the left (col-5), attendee cards right (col-7)
     - Tag "LIVE" signals this is real, happening now
     - QR code is a large placeholder image (swap /qr-companion.png)
     - Right side shows placeholder attendee cards with v-click stagger,
       simulating people scanning and joining in real time
     - Cards use existing .card token with name + context line
     - CrossMarkers add subtle ambient energy
     - hint-pill below QR invites action
     - The split creates visual tension: static QR vs. dynamic filling cards

     Slide 7 (The Recursive Loop — Transition):
     The contemplative BRIDGE into Section 2. After the high energy of
     the live demo, the room needs a breath. Design choices:
     - layout-center, near-black, minimal elements
     - TextReveal builds the key phrase slowly — pacing creates weight
     - Three-step compression: TV (decades) → Internet (a decade) → AI (months)
     - Final reveal: "This is a recursive loop" — the thesis statement
       for Section 2, delivered with t--gradient for emphasis
     - DrawLine appears as a visual breath before the punchline
     - No 3D, no CrossMarkers, no MouseSpotlight — deliberate restraint
       creates contrast with the energy of slide 6
     ============================================================ -->

---
transition: fade
---

<!-- SLIDE 6 — QR Code: Live Companion App -->

<CrossMarkers
  :positions="[
    { top: '100px', left: '140px' },
    { top: '100px', right: '140px' },
    { bottom: '100px', left: '140px' },
    { bottom: '100px', right: '140px' }
  ]"
  color="rgba(245, 158, 11, 0.12)"
  :size="24"
  :delay="300"
/>

<div class="slide-grid grid--center">

<div class="col-5" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
  <span class="tag">Live</span>
  <div style="width: calc(12rem * var(--cs)); height: calc(12rem * var(--cs)); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 16px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.03);">
    <img src="/qr-companion.png" alt="Scan to join" style="width: 90%; height: 90%; object-fit: contain;" />
  </div>
  <p class="t-body-sm t--muted mt-lg">Scan to launch your companion.</p>
  <span class="hint-pill mt-sm">built for this room · gone after today</span>
</div>

<div class="col-7" style="display: flex; flex-direction: column; gap: var(--space-sm); justify-content: center;">

<div v-click class="card" style="padding: var(--space-sm) var(--space-md); flex-direction: row; align-items: center; gap: var(--space-md);">
  <span class="t-stat-small t--gradient" style="min-width: calc(2.5rem * var(--cs));">S.H.</span>
  <div>
    <span class="t-panel-title">Sebastian Hernandez</span>
    <span class="t-body-desc t--dim ml-md">FinMa Partners</span>
  </div>
</div>

<div v-click class="card" style="padding: var(--space-sm) var(--space-md); flex-direction: row; align-items: center; gap: var(--space-md);">
  <span class="t-stat-small t--gradient" style="min-width: calc(2.5rem * var(--cs));">M.K.</span>
  <div>
    <span class="t-panel-title">Maria Kowalski</span>
    <span class="t-body-desc t--dim ml-md">FinMa Ventures</span>
  </div>
</div>

<div v-click class="card" style="padding: var(--space-sm) var(--space-md); flex-direction: row; align-items: center; gap: var(--space-md);">
  <span class="t-stat-small t--gradient" style="min-width: calc(2.5rem * var(--cs));">D.L.</span>
  <div>
    <span class="t-panel-title">David Laurent</span>
    <span class="t-body-desc t--dim ml-md">FinMa Capital</span>
  </div>
</div>

<div v-click class="card" style="padding: var(--space-sm) var(--space-md); flex-direction: row; align-items: center; gap: var(--space-md);">
  <span class="t-stat-small t--gradient" style="min-width: calc(2.5rem * var(--cs));">R.P.</span>
  <div>
    <span class="t-panel-title">Rachel Park</span>
    <span class="t-body-desc t--dim ml-md">FinMa Advisory</span>
  </div>
</div>

<div v-click class="card" style="padding: var(--space-sm) var(--space-md); flex-direction: row; align-items: center; gap: var(--space-md);">
  <span class="t-stat-small t--gradient" style="min-width: calc(2.5rem * var(--cs));">J.T.</span>
  <div>
    <span class="t-panel-title">James Torres</span>
    <span class="t-body-desc t--dim ml-md">FinMa Group</span>
  </div>
</div>

</div>

</div>

---
transition: fade
---

<!-- SLIDE 7 — The Recursive Loop (Transition into Section 2) -->

<div class="layout-center">

<span class="t-hint mb-xl">A thought before we continue</span>

<TextReveal
  text="Television took decades to find its format."
  class="t-body-sm t--muted"
  :delay="400"
  :stagger="40"
  :duration="600"
/>

<TextReveal
  text="The internet took at least one."
  class="t-body-sm t--muted mt-md"
  :delay="1200"
  :stagger="40"
  :duration="600"
/>

<TextReveal
  text="AI rewrites the rules every two months."
  class="t-body mt-lg"
  :delay="2200"
  :stagger="40"
  :duration="700"
/>

<div class="mt-xl">
  <DrawLine width="30%" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="3200" :duration="800" />
</div>

<TextReveal
  text="This is a recursive loop."
  class="t-subheading t--gradient mt-xl"
  :delay="3800"
  :stagger="70"
  :duration="900"
/>

</div>
