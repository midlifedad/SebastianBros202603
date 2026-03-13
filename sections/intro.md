---
# IMPORTANT: clicks: 1 is required here so $clicks >= 1 works in the CrtTv component.
# Without it, Slidev skips this slide entirely (no click allocated for the video trigger).
clicks: 1
---

<!-- SLIDE 1 — Retro Video Intro -->

<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #000;">
  <CrtTv src="/intro.mp4" :active="$clicks >= 1" :muted="false" :zoomDuration="45" titleText="Steve Jobs — 1985" :titleDelay="500" :titleHold="2000" />
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Velocity of Assimilation (interactive timeline, resets on slide entry) -->

<GraphFrame />

---
transition: fade
---

<!-- SLIDE — The Google Way (Section 1: A New Medium) -->

<!-- Scene: Watching someone Google a name. Search bar appears, name types, results slide up. -->

<div class="layout-center">

<span class="tag anim-fade-in">THE OUTGOING MEDIUM</span>

<TextReveal text="Google It" class="t-subheading-sm" :delay="200" :stagger="50" />

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="600" />

<div class="anim-fade-up d-1000" style="margin-top: var(--space-xl); width: calc(32rem * var(--cs)); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: calc(2rem * var(--cs)); padding: var(--space-sm) var(--space-lg); display: inline-flex; align-items: center; gap: var(--space-sm);">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-dim)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
<TypeWriter text="Dirk Sebastian" :delay="1500" :speed="60" class="t-body-sm" style="color: var(--color-text) !important;" />
</div>

<div style="display: flex; flex-direction: column; gap: var(--space-sm); margin-top: var(--space-md); width: calc(32rem * var(--cs));">

<div class="card anim-fade-up d-3000" style="padding: var(--space-sm) var(--space-lg); text-align: left;">
<span class="t-hint" style="color: var(--color-teal);">linkedin.com/in/dirk-sebastian</span>
<p class="t-panel-title mt-xs">Dirk Sebastian — Managing Partner</p>
<p class="t-body-desc t--dim mt-xs">Co-founded Sebastian Group. European private wealth, family office advisory...</p>
</div>

<div class="card anim-fade-up d-3500" style="padding: var(--space-sm) var(--space-lg); text-align: left;">
<span class="t-hint" style="color: var(--color-teal);">bloomberg.com/profile</span>
<p class="t-panel-title mt-xs">Executive Profile — Bloomberg</p>
<p class="t-body-desc t--dim mt-xs">Board positions, transaction history, recent news articles...</p>
</div>

</div>

</div>

---
transition: fade
---

<!-- SLIDE — Level 1: ChatGPT (Section 1: A New Medium) -->

<!-- Scene: Watching someone prompt ChatGPT. Prompt types itself, response materializes. -->

<div class="layout-center">

<span class="tag anim-fade-in">Level 1 · ChatGPT</span>

<TextReveal text="Give it context" class="t-subheading" :delay="200" :stagger="50" />

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="600" />

<div class="card card--active anim-scale-up d-1000" style="flex-shrink: 0; margin-top: var(--space-lg); padding: var(--space-sm) var(--space-lg); width: calc(36rem * var(--cs)); text-align: left;">
<span class="t-hint mb-xs">Prompt</span>
<p class="t-body-sm" style="color: var(--color-text) !important;"><TypeWriter text="I'm presenting at a family reunion hosted by the Sebastian brothers. Research Dirk — background, investments, recent activity, and conversation starters." :delay="1500" :speed="18" :cursor="true" /></p>
</div>

<div class="card anim-fade-up d-5000" style="flex-shrink: 0; margin-top: var(--space-sm); padding: var(--space-sm) var(--space-lg); width: calc(36rem * var(--cs)); text-align: left;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xs) var(--space-lg);">
<div class="anim-fade-in d-5000">
<span class="t-label" style="color: var(--color-text-dim);">Background</span>
<p class="t-body-desc mt-xs">Sebastian Group. European private wealth.</p>
</div>
<div class="anim-fade-in" style="animation-delay: 5.3s;">
<span class="t-label" style="color: var(--color-text-dim);">Investments</span>
<p class="t-body-desc mt-xs">Family offices, PE, sustainable real estate.</p>
</div>
<div class="anim-fade-in" style="animation-delay: 5.6s;">
<span class="t-label" style="color: var(--color-text-dim);">Recent</span>
<p class="t-body-desc mt-xs">GreenBridge Capital seed round (2025).</p>
</div>
<div class="anim-fade-in" style="animation-delay: 5.9s;">
<span class="t-label" style="color: var(--color-text-dim);">Openers</span>
<p class="t-body-desc mt-xs">Next-gen wealth transfer, PropTech thesis.</p>
</div>
</div>
</div>

</div>

---
transition: fade
---

<!-- SLIDE — Level 2: Deep Research (Section 1: A New Medium) -->

<!-- Scene: AI spinning up autonomous research. Inputs scatter in, outputs materialize. -->

<CrossMarkers
  :positions="[{ top: '90px', right: '140px' }]"
  color="rgba(245, 158, 11, 0.08)"
  :size="24"
  :delay="400"
/>

<div class="layout-center">

<span class="tag anim-fade-in">Level 2 · Deep Research</span>

<TextReveal text="Research all of them" class="t-subheading-sm" :delay="200" :stagger="50" />

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="600" />

<div style="display: flex; gap: var(--space-sm); margin-top: var(--space-lg); justify-content: center;">
<span class="pill anim-slide-left d-1000">Attendee list</span>
<span class="pill anim-slide-left d-1200">Slide deck</span>
<span class="pill anim-slide-left d-1400">LinkedIn</span>
<span class="pill anim-slide-left d-1600">News</span>
</div>

<div style="display: flex; gap: var(--space-md); margin-top: var(--space-lg); width: calc(52rem * var(--cs));">

<div class="card anim-fade-up d-2500" style="flex: 1; padding: var(--space-sm) var(--space-md); text-align: left;">
<span class="t-label" style="color: var(--color-amber);">Per Attendee</span>
<p class="t-panel-title mt-xs">Individual Briefings</p>
<p class="t-body-desc t--dim mt-xs">Background, role, interests, conversation openers</p>
</div>

<div class="card anim-fade-up d-3000" style="flex: 1; padding: var(--space-sm) var(--space-md); text-align: left;">
<span class="t-label" style="color: var(--color-amber);">Presentation</span>
<p class="t-panel-title mt-xs">Tailored Talking Points</p>
<p class="t-body-desc t--dim mt-xs">Angles mapped to who's in the room</p>
</div>

<div class="card anim-fade-up d-3500" style="flex: 1; padding: var(--space-sm) var(--space-md); text-align: left;">
<span class="t-label" style="color: var(--color-amber);">Networking</span>
<p class="t-panel-title mt-xs">Connection Map</p>
<p class="t-body-desc t--dim mt-xs">Shared interests, mutual contacts, warm intros</p>
</div>

</div>

<p class="t-hint anim-fade-in d-4500"><span class="t--accent">45 min</span> · autonomous · parallel</p>

</div>

---
clicks: false
layout: iframe
url: https://companion-app-production-bdad.up.railway.app/display.html?token=2OUiz3fy0R6IP3JGchhV0YwHg_jQX_El4cSf4VJIOWw&eventToken=nDb5M9J2qNmhp9UgciitKqn_9Q-tkuX4eNnzh3YNiSE
---
