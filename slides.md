---
theme: none
title: The Wrong Rubric
info: |
  Amir Haque — FinMa Family Reunion
  Whistler BC — March 12, 2026
canvasWidth: 1920
class: text-center
transition: fade
highlighter: shiki
colorSchema: dark
drawings:
  enabled: false
fonts:
  sans: Inter
  serif: Playfair Display
  mono: JetBrains Mono
clicks: 1
---

<!-- SLIDE 1 — Retro Video Intro -->

<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #000;">
  <CrtTv src="/intro.mp4" :active="$clicks >= 1" :muted="false" :zoomDuration="45" titleText="Steve Jobs — 1985" :titleDelay="500" :titleHold="2000" />
</div>


---
transition: fade
---

<!-- SLIDE — The Google Way (Section 1: A New Medium) -->

<!-- Scene: Watching someone Google a name. Search bar appears, name types, results slide up. -->

<div class="layout-center">

<span class="tag anim-fade-in">A New Medium</span>

<TextReveal text="Google his name" class="t-subheading" :delay="200" :stagger="50" />

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

<TextReveal text="Research all of them" class="t-subheading" :delay="200" :stagger="50" />

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
transition: fade
---

<!-- SLIDE — Level 3: Fully Agentic (Section 1: A New Medium) -->

<!-- Scene: Everything delivered. Pills cascade in, cards glow into existence. -->

<CrossMarkers
  :positions="[
    { top: '80px', left: '140px' },
    { bottom: '90px', right: '120px' },
    { top: '200px', right: '300px' }
  ]"
  color="rgba(245, 158, 11, 0.1)"
  :size="28"
  :delay="300"
/>

<div class="layout-center">

<span class="tag anim-fade-in">Level 3 · Fully Agentic</span>

<TextReveal text="I pasted the email" class="t-subheading" :delay="200" :stagger="60" />

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.3)" :delay="600" />

<div style="display: flex; gap: var(--space-sm); margin-top: var(--space-lg); justify-content: center; flex-wrap: wrap;">
<span class="pill anim-slide-left d-1000">Email thread</span>
<span class="pill anim-slide-left d-1200">Deck link</span>
<span class="pill anim-slide-left d-1400">Attendees</span>
<span class="pill anim-slide-left d-1600">Past talks</span>
<span class="pill anim-slide-left d-1800">Calendar</span>
</div>

<div style="display: flex; gap: var(--space-md); margin-top: var(--space-lg); width: calc(52rem * var(--cs));">

<div class="card card--active anim-scale-up-glow d-2500" style="flex: 1; padding: var(--space-sm) var(--space-md); text-align: left;">
<span class="t-label">Delivered</span>
<p class="t-panel-title mt-xs">A New Presentation</p>
<p class="t-body-desc mt-xs">Slide deck tailored to this audience, ready to deliver</p>
</div>

<div class="card card--active anim-scale-up-glow d-3000" style="flex: 1; padding: var(--space-sm) var(--space-md); text-align: left;">
<span class="t-label">Delivered</span>
<p class="t-panel-title mt-xs">Companion App</p>
<p class="t-body-desc mt-xs">Interactive attendee resource, personalized per person</p>
</div>

<div class="card card--active anim-scale-up-glow d-3500" style="flex: 1; padding: var(--space-sm) var(--space-md); text-align: left;">
<span class="t-label">Delivered</span>
<p class="t-panel-title mt-xs">14 Personalized Packages</p>
<p class="t-body-desc mt-xs">Follow-ups, research briefs, and action items</p>
</div>

</div>

<p class="t-body-sm t--muted anim-fade-in d-4500">Not suggestions. <span class="t--accent">The thing itself.</span></p>

</div>

---
transition: fade
---

<!-- SLIDE — QR Code (Section 1: A New Medium) -->

<div class="layout-center">

<span class="tag anim-fade-in">Live</span>

<TextReveal text="It built this for you." class="t-subheading" :delay="200" :stagger="60" />

<div class="anim-scale-up d-1500" style="width: calc(14rem * var(--cs)); height: calc(14rem * var(--cs)); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 16px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.03); margin-top: var(--space-xl);">
<svg viewBox="0 0 200 200" style="width: 80%; height: 80%;" fill="rgba(245, 158, 11, 0.7)">
<rect x="10" y="10" width="60" height="60" rx="4"/><rect x="20" y="20" width="40" height="40" rx="2" fill="#0a0a0f"/><rect x="28" y="28" width="24" height="24" rx="1"/>
<rect x="130" y="10" width="60" height="60" rx="4"/><rect x="140" y="20" width="40" height="40" rx="2" fill="#0a0a0f"/><rect x="148" y="28" width="24" height="24" rx="1"/>
<rect x="10" y="130" width="60" height="60" rx="4"/><rect x="20" y="140" width="40" height="40" rx="2" fill="#0a0a0f"/><rect x="28" y="148" width="24" height="24" rx="1"/>
<rect x="85" y="10" width="12" height="12"/><rect x="105" y="10" width="12" height="12"/><rect x="85" y="32" width="12" height="12"/><rect x="105" y="45" width="12" height="12"/>
<rect x="85" y="60" width="12" height="12"/><rect x="10" y="85" width="12" height="12"/><rect x="32" y="85" width="12" height="12"/><rect x="55" y="85" width="12" height="12"/>
<rect x="85" y="85" width="12" height="12"/><rect x="105" y="85" width="12" height="12"/><rect x="130" y="85" width="12" height="12"/><rect x="155" y="85" width="12" height="12"/>
<rect x="178" y="85" width="12" height="12"/><rect x="85" y="105" width="12" height="12"/><rect x="130" y="105" width="12" height="12"/><rect x="155" y="130" width="12" height="12"/>
<rect x="178" y="130" width="12" height="12"/><rect x="130" y="155" width="12" height="12"/><rect x="155" y="155" width="12" height="12"/><rect x="178" y="155" width="12" height="12"/>
<rect x="130" y="178" width="12" height="12"/><rect x="155" y="178" width="12" height="12"/><rect x="178" y="178" width="12" height="12"/><rect x="85" y="130" width="12" height="12"/>
<rect x="85" y="155" width="12" height="12"/><rect x="105" y="155" width="12" height="12"/><rect x="85" y="178" width="12" height="12"/><rect x="105" y="178" width="12" height="12"/>
</svg>
</div>

<p class="t-body-sm t--muted anim-fade-in d-3000 mt-lg">Scan it. Your companion is waiting.</p>

<span class="hint-pill anim-fade-in d-3500 mt-sm">built for this room · gone after today</span>

</div>

---
transition: fade
---

<!-- SLIDE — The Recursive Loop (Section 1: A New Medium) -->

<div class="layout-center">

<TextReveal
  text="Television took decades to find its voice."
  class="t-body t--muted"
  :delay="400"
  :stagger="40"
  :duration="600"
/>

<TextReveal
  text="The internet took at least one."
  class="t-body t--muted mt-md"
  :delay="1800"
  :stagger="40"
  :duration="600"
/>

<TextReveal
  text="AI rewrites the rules every two months."
  class="t-body mt-xl"
  :delay="3200"
  :stagger="40"
  :duration="700"
/>

<div class="mt-2xl">
<DrawLine width="25%" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="4400" :duration="800" />
</div>

<TextReveal
  text="This is a recursive loop."
  class="t-heading t--gradient mt-xl"
  :delay="5200"
  :stagger="80"
  :duration="1000"
/>

</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Cover -->

<MouseSpotlight :radius="400" :opacity="0.06" />

<div class="layout-center">
  <p class="t-body-sm t--dim mb-sm" style="letter-spacing: calc(0.3rem * var(--cs)); text-transform: uppercase;">
    FinMa Family Reunion · Whistler BC · March 2026
  </p>
  <h1 class="t-display" style="line-height: 1.1;">
    <span class="accent-gradient">The Wrong Rubric</span>
  </h1>
  <p class="t-body t--muted mt-lg">Amir Haque</p>
</div>

---
transition: fade
---

<!-- SLIDE 2 — Statement (Quote test) -->

<div class="layout-center">

> "That's the wrong rubric."

</div>

---
transition: fade
---

<!-- SLIDE 3 — Section Divider test -->

<div class="layout-center section-line">

# The Exponential Arc

<p class="t-body t--muted mt-lg">Understanding the curve we're living inside</p>

</div>

---
transition: fade
---

<!-- SLIDE 4 — Content with v-click animations -->

<div class="layout-left">

## Linear vs. Exponential

<div class="mt-xl" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4xl); width: 100%;">

<div v-click>
  <div class="t-stat-rolling t--gradient">30</div>
  <p class="t-body mt-md">linear steps</p>
  <p class="t-heading accent mt-sm">30 meters</p>
</div>

<div v-click>
  <div class="t-stat-rolling t--gradient">30</div>
  <p class="t-body mt-md">exponential steps</p>
  <p class="t-heading accent mt-sm">26× around the Earth</p>
</div>

</div>

<p v-click class="t-body t--italic t--muted mt-xl" style="text-align: center; width: 100%;">
  We are wired for linear. We are living inside exponential.
</p>

</div>

---
transition: fade
---

<!-- SLIDE 5 — Big Statement -->

<div class="layout-center">

> "Eighteen months. I was off by a decade."

<p v-click class="t-body t--muted mt-xl">
  I knew the direction. I was wildly wrong about the distance.
</p>

</div>

---
transition: fade
---

<!-- SLIDE 6 — The Build Streak (list with v-clicks) -->

<div class="layout-left slide-compact-list">

## The Build Streak

<div class="mt-md">
<v-clicks>

- Order-taking system for our private chef — **1 week**
- iOS travel management app — **4 days**
- Encrypted agent-to-agent communication protocol
- Agentic creator discovery engine
- Coloring book generator (daughter's sketches → printable pages)
- Swarmify: 12-agent orchestration system

</v-clicks>
</div>

<blockquote v-click class="mt-md">
  <p>"One person. Two months. Work that would have required a team of 30 and a year of development."</p>
</blockquote>

</div>

---
transition: fade
---

<!-- SLIDE 7 — Embedded Website: Interactive Globe (test iframe) -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://globe.gl/example/world-population/" title="Globe Visualization">
    <iframe
      src="https://globe.gl/example/world-population/"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
      tabindex="-1"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
---

<!-- SLIDE 8 — Embedded Website: Creative coding (test iframe 2) -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://openprocessing.org/sketch/2000340" title="Generative Art">
    <iframe
      src="https://openprocessing.org/sketch/2000340/embed/?plusEmbedHash=YjdlMjlm&userID=388858&show=sketch&screen=embed"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
      tabindex="-1"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
---

<!-- SLIDE 9 — Two Column Layout test -->

<div class="layout-left slide-compact-list">

## The Choice

<div class="mt-xl" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); width: 100%;">

<div style="padding: var(--space-lg); border-radius: 16px; border: 1px solid rgba(239,68,68,0.2); background: rgba(239,68,68,0.05);">
  <h3 class="t-label mb-md" style="color: var(--color-red) !important;">Path A — Fear</h3>
  <v-clicks>

  - Cost of what you sell → approaching zero
  - Competitive moats → eroding
  - Expertise built over decades → replicable in minutes

  </v-clicks>
</div>

<div style="padding: var(--space-lg); border-radius: 16px; border: 1px solid rgba(245,158,11,0.2); background: rgba(245,158,11,0.05);">
  <h3 class="t-label mb-md" style="color: var(--color-accent) !important;">Path B — Opportunity</h3>
  <v-clicks>

  - Most creative, most opportunity-rich moment in history
  - One person can do what 30 used to
  - The gap between idea and reality: never smaller
  - The value of being human: never higher

  </v-clicks>
</div>

</div>

</div>

---
transition: fade
---

<!-- SLIDE 10 — Embedded Website: NASA Solar System (test iframe 3) -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://eyes.nasa.gov/apps/solar-system/" title="Solar System">
    <iframe
      src="https://eyes.nasa.gov/apps/solar-system/"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
      tabindex="-1"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE 11 — Embedded Website: youam.network -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://youam.network" title="youam.network" width="66%" height="120%" :zoom=".9" top="8%">
    <iframe
      src="https://youam.network"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE 12 — Embedded Website: clawlink.network -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://clawlink.network" title="clawlink.network" width="66%" height="120%" :zoom="0.75" top="5%">
    <iframe
      src="https://clawlink.network"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
---

<!-- SLIDE 13 — Side by Side: youam + clawlink -->

<div class="browser-frame-slide" style="gap: calc(1rem * var(--cs)); align-items: stretch;">
  <div v-click="1" style="width: 50%; display: flex;">
    <BrowserFrame url="https://youam.network" title="youam.network" width="100%" height="110%" :zoom="0.6" top="5%">
      <iframe
        src="https://youam.network"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        loading="lazy"
      ></iframe>
    </BrowserFrame>
  </div>
  <div v-click="2" style="width: 50%; display: flex;">
    <BrowserFrame url="https://clawlink.network" title="clawlink.network" width="100%" height="110%" :zoom="0.6" top="5%">
      <iframe
        src="https://clawlink.network"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        loading="lazy"
      ></iframe>
    </BrowserFrame>
  </div>
</div>

---
transition: fade
---

<!-- SLIDE 14 — Closing -->

<div class="layout-center">

> "The question isn't whether this is happening."

<p v-click class="t-subheading t--italic mt-xl">
  It's who you want to be while it does.
</p>

</div>

---
transition: fade
---

<!-- SAMPLE A — Authority Quote (OpenWeb-inspired editorial serif, tight tracking) -->

<MouseSpotlight />

<div class="layout-center">
  <div class="t-quote">
    The cost of building anything just collapsed to near zero.
  </div>
  <div class="t-attribution mt-xl">
    <span class="accent-line"></span> The price collapse thesis
  </div>
</div>

---
transition: fade
---

<!-- SAMPLE B — Mega Numbers (Hourly-inspired oversized stats) -->

<div class="layout-center">
  <div class="t-stat-mega t--gradient">1→30</div>
  <div class="t-subtitle mt-lg">the new leverage ratio</div>
  <div class="t-body mt-lg" style="text-align: center;">
    One person now does the work of thirty. Not in theory — in production.
  </div>
</div>

---
transition: fade
---

<!-- SAMPLE C — Video Overlay (Pop Manifesto-inspired bg video + text) -->

<div class="video-slide">
  <video
    autoplay muted loop playsinline
    src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
  ></video>
  <div class="scrim"></div>
  <div class="layout-overlay layout-overlay--bottom-left">
    <h2 class="t-title t--shadow">We built it in<br/>two months.</h2>
    <p class="t-body t--shadow mt-lg">
      Twelve AI agents. One orchestration system.
      Work that would have taken a team of thirty and a year of runway.
    </p>
  </div>
</div>

---
transition: fade
---

<!-- SAMPLE D — Spotlight Slide (Lusion-inspired ambient cursor glow + editorial type) -->

<MouseSpotlight />

<div class="layout-center">
  <div class="t-title">
    The question isn't whether<br/>
    <em>this is happening.</em>
  </div>
  <p class="t-body mt-xl">
    It's whether you'll be the one building — or the one watching someone else build what you could have.
  </p>
  <div class="pill-row mt-xl">
    <span class="pill">exponential</span>
    <span class="pill">leverage</span>
    <span class="pill">agency</span>
  </div>
</div>

---
transition: fade
---

<!-- SAMPLE E — Bold Split: The Agency (Slide 17 from outline) -->

<div class="layout-split-stat">
  <div>
    <div class="t-stat-large">8</div>
    <div class="stat-label">weeks</div>
  </div>
  <div class="divider-v"></div>
  <div>
    <div class="t-stat-large accent">6</div>
    <div class="stat-label">minutes</div>
  </div>
  <div class="split-context">
    <p class="t-body-sm t--muted">
      Brand strategy: from deliverable to starting input.
    </p>
  </div>
</div>

---
transition: fade
---

<!-- SAMPLE F — 3D Particle Curve: The Exponential Arc (Slide 7 from outline) -->

<ParticleCurve />

<div class="layout-overlay layout-overlay--bottom-left layout-overlay--tight">
  <span class="tag t--shadow">Section 2</span>
  <div class="t-title t--shadow">
    The curve was drawn decades ago.
  </div>
  <p class="t-body-xs t--shadow mt-lg">
    We're on schedule. The only question is whether you see it.
  </p>
</div>

---
transition: fade
---

<!-- SAMPLE G — Four-Panel Progression: How I Prepared This Talk (Slide 3 from outline) -->

<div class="layout-grid-4">
  <div class="card">
    <div>
      <div class="card-number">1</div>
      <div class="t-label">2023</div>
      <div class="t-panel-title mt-sm">Google + LinkedIn</div>
    </div>
    <div class="t-body-desc mt-md">Generic research. Generic slides. The default workflow.</div>
  </div>
  <div class="card">
    <div>
      <div class="card-number">2</div>
      <div class="t-label">Early 2025</div>
      <div class="t-panel-title mt-sm">ChatGPT as assistant</div>
    </div>
    <div class="t-body-desc mt-md">AI shaped the deck. Still my structure, but faster.</div>
  </div>
  <div class="card">
    <div>
      <div class="card-number">3</div>
      <div class="t-label">Late 2025</div>
      <div class="t-panel-title mt-sm">Full audience research</div>
    </div>
    <div class="t-body-desc mt-md">Complete narrative arc built from deep research on every attendee.</div>
  </div>
  <div class="card card--active">
    <div>
      <div class="card-number">4</div>
      <div class="t-label">This talk</div>
      <div class="t-panel-title mt-sm">Custom companion agent</div>
    </div>
    <div class="t-body-desc mt-md">Built for this room. Built for today. Gone after.</div>
  </div>
</div>

---
transition: fade
---

<!-- SAMPLE H — 3D Recursive Helix: The Recursive Loop (Slide 21 from outline) -->

<RecursiveHelix />

<div class="layout-overlay layout-overlay--center-right">
  <span class="tag t--shadow">The recursive loop</span>
  <div class="t-heading t--shadow">
    I'm using the technology to improve how I use the technology.
  </div>
  <p class="t-body-xs t--shadow mt-lg">
    Single agent → 12-agent orchestration → project scoping → testing frameworks → deployment engines → autonomous execution → improve the system itself.
  </p>
</div>

---
transition: fade
---

<!-- SAMPLE I — Text Reveal Animation (Lusion word-split mask) -->

<CrossMarkers :count="4" color="rgba(245, 158, 11, 0.15)" :size="30" :delay="800" />

<div class="layout-left">
  <span class="tag">Technique: Word-Split Reveal</span>
  <TextReveal
    text="The cost of building
anything just collapsed
to near zero."
    class="t-heading"
    :delay="200"
    :stagger="60"
    :duration="800"
  />
  <DrawLine :width="500" :height="2" :delay="1200" :duration="600" class="mt-xl" />
  <TextReveal
    text="What used to require teams, timelines, and capital now requires only clarity of thought and willingness to begin."
    class="t-body-sm mt-lg"
    :delay="1400"
    :stagger="30"
    :duration="600"
  />
</div>

---
transition: fade
---

<!-- SAMPLE J — Rolling Text Hover Reveal (Lusion char-wrapper technique) -->

<MouseSpotlight />

<div class="layout-center">
  <div class="t-subtitle mb-lg">Hover to reveal</div>
  <div class="t-stat-rolling">
    <RollingText text="The Wrong" color="var(--color-accent)" />
  </div>
  <div class="t-stat-rolling">
    <RollingText text="Rubric" color="var(--color-blue)" />
  </div>
  <div style="height: var(--space-lg)"></div>
  <div class="t-body-sm" style="max-width: calc(32rem * var(--cs)); text-align: center;">
    Each character rolls independently with staggered timing, creating a fluid wave effect on hover.
  </div>
  <div class="hint-pill mt-xl">hover the text above</div>
</div>

---
transition: fade
---

<!-- SAMPLE K — Decorated Statement (cross markers + draw lines + text reveal) -->

<CrossMarkers
  :positions="[
    { top: '120px', left: '160px' },
    { top: '120px', right: '160px' },
    { bottom: '120px', left: '160px' },
    { bottom: '120px', right: '160px' },
    { top: '50%', left: '160px' },
    { top: '50%', right: '160px' }
  ]"
  color="rgba(245, 158, 11, 0.2)"
  :size="28"
  :delay="300"
/>

<div class="layout-center">
  <div class="deco-lines">
    <DrawLine class="line-top" width="100%" :height="2" color="rgba(245, 158, 11, 0.3)" :delay="400" :duration="1000" />
    <TextReveal
      text="One person can do
what thirty used to."
      class="t-title"
      :delay="600"
      :stagger="80"
      :duration="800"
    />
    <DrawLine class="line-bottom-left" width="45%" :height="2" color="rgba(245, 158, 11, 0.3)" :delay="1400" :duration="600" />
    <DrawLine class="line-bottom-right" width="58%" :height="2" color="rgba(245, 158, 11, 0.3)" :delay="1600" :duration="600" direction="right" />
  </div>
  <TextReveal
    text="Not in theory. In production. The gap between idea and reality has never been smaller."
    class="t-body mt-lg"
    :delay="1800"
    :stagger="25"
    :duration="500"
  />
</div>

---
transition: fade
---

<!-- SAMPLE L — Section Color Theming (Lusion dark/light toggle) -->

<div class="theme-demo">
  <DrawLine class="theme-divider" :width="2" height="100%" :delay="300" :duration="800" direction="left" :vertical="true" style="position: absolute; left: 50%; top: 0;" />
  <div class="theme-half dark-half">
    <CrossMarkers
      :positions="[{ top: '80px', left: '80px' }, { bottom: '80px', left: '80px' }]"
      color="rgba(245, 158, 11, 0.2)"
      :size="24"
      :delay="500"
    />
    <span class="t-tag">Dark mode</span>
    <div class="t-heading mt-md" style="color: #f0ece4;">
      <TextReveal text="Fear says wait." :delay="400" :stagger="70" :duration="700" />
    </div>
    <p class="t-body-xs mt-md" style="color: rgba(240,236,228,0.5);">
      Cost approaching zero. Moats eroding. Expertise replicable in minutes.
    </p>
  </div>
  <div class="theme-half light-half">
    <CrossMarkers
      :positions="[{ top: '80px', right: '80px' }, { bottom: '80px', right: '80px' }]"
      color="rgba(26, 47, 251, 0.2)"
      :size="24"
      :delay="700"
    />
    <span class="t-tag">Light mode</span>
    <div class="t-heading mt-md" style="color: #0a0a0f;">
      <TextReveal text="Opportunity says build." :delay="600" :stagger="70" :duration="700" />
    </div>
    <p class="t-body-xs mt-md" style="color: rgba(10,10,15,0.5);">
      Most creative moment in history. The value of being human has never been higher.
    </p>
  </div>
</div>

---
transition: fade
---

<!-- SAMPLE M — Combined Showcase (all Lusion techniques together) -->

<ParticleCurve />
<CrossMarkers
  :positions="[
    { top: '120px', left: '160px' },
    { top: '120px', right: '160px' },
    { bottom: '120px', right: '160px' }
  ]"
  color="rgba(245, 158, 11, 0.12)"
  :size="28"
  :delay="400"
/>

<div class="layout-overlay layout-overlay--bottom-left">
  <span class="tag t--shadow">Section 4 — The Agency</span>
  <TextReveal
    text="Build the future
or watch it happen."
    class="t-title t--shadow"
    :delay="300"
    :stagger="70"
    :duration="800"
  />
  <div class="line-wrapper">
    <DrawLine width="100%" :height="3" :delay="1200" :duration="800" />
  </div>
  <div class="stat-row">
    <div class="stat-block">
      <div class="t-stat-rolling t--shadow">12</div>
      <div class="stat-label t--shadow">AI agents</div>
    </div>
    <div class="stat-block">
      <div class="t-stat-rolling t--shadow">2</div>
      <div class="stat-label t--shadow">months</div>
    </div>
    <div class="stat-block">
      <div class="t-stat-rolling t--shadow">1</div>
      <div class="stat-label t--shadow">person</div>
    </div>
  </div>
</div>

---
transition: fade
---

<!-- SAMPLE N — Floating Wireframe Geometry (3D objects behind editorial text) -->

<FloatingGeometry />
<CrossMarkers
  :positions="[
    { top: '100px', right: '140px' },
    { bottom: '100px', right: '140px' }
  ]"
  color="rgba(245, 158, 11, 0.15)"
  :size="24"
  :delay="600"
/>

<div class="layout-overlay layout-overlay--bottom-left">
  <span class="tag t--shadow">3D: Floating Wireframe Geometry</span>
  <TextReveal
    text="Ideas are the only
currency that matters."
    class="t-title t--shadow"
    :delay="300"
    :stagger="70"
    :duration="800"
  />
  <DrawLine :width="360" :height="3" :delay="1200" :duration="600" class="mt-xl" />
  <p class="t-body-xs t--shadow mt-lg">
    Wireframe torus, icosahedron, octahedron, and torusknot float at different depths with ambient particles.
  </p>
</div>

---
transition: fade
---

<!-- SAMPLE O — Particle Tunnel (Lusion #home-goal inspired fly-through) -->

<ParticleTunnel />

<div class="layout-overlay layout-overlay--center">
  <TextReveal
    text="Step into
a new world."
    class="t-display t--shadow"
    :delay="400"
    :stagger="100"
    :duration="900"
  />
  <p class="t-body-sm t--shadow t--muted mt-lg" style="text-align: center;">5,000 particles forming a cylindrical tunnel with ring guides</p>
</div>

---
transition: fade
---

<!-- SAMPLE P — Morphing Sphere (vertex displacement + wireframe) -->

<MorphingSphere />

<div class="layout-split" style="z-index: 2; position: relative;">
  <div>
    <span class="tag t--shadow">3D: Vertex Displacement</span>
    <TextReveal
      text="Intelligence is
not static."
      class="t-subheading t--shadow"
      :delay="300"
      :stagger="80"
      :duration="700"
    />
    <DrawLine :width="280" :height="3" :delay="1100" :duration="600" class="mt-xl" />
    <p class="t-body-xs t--shadow mt-lg">
      An icosahedron with sine-wave vertex displacement creates an organic, breathing form. Inner point cloud adds depth.
    </p>
  </div>
  <div></div>
</div>

---
transition: fade
---

<!-- SAMPLE Q — SVG Path Draw (animated flowing line across slide) -->

<SvgPathDraw :delay="200" :duration="2500" color="rgba(245, 158, 11, 0.4)" :stroke-width="4" />

<CrossMarkers
  :positions="[
    { top: '100px', left: '140px' },
    { top: '100px', right: '140px' },
    { bottom: '100px', left: '140px' },
    { bottom: '100px', right: '140px' }
  ]"
  color="rgba(245, 158, 11, 0.15)"
  :size="28"
  :delay="500"
/>

<div class="layout-overlay layout-overlay--bottom-left">
  <span class="tag t--shadow">Technique: SVG Path Animation</span>
  <TextReveal
    text="The trajectory
was set decades ago."
    class="t-title t--shadow"
    :delay="800"
    :stagger="70"
    :duration="700"
  />
  <p class="t-body-sm t--shadow mt-lg">
    A flowing SVG curve draws itself using stroke-dashoffset animation. Secondary path follows with delay.
  </p>
</div>

---
transition: fade
---

<!-- SAMPLE R — Parallax Depth Layers (mouse-reactive multi-depth particles) -->

<ParallaxDepth />

<div class="layout-overlay layout-overlay--center">
  <TextReveal
    text="Depth is not
decoration."
    class="t-display t--shadow"
    :delay="300"
    :stagger="80"
    :duration="800"
  />
  <p class="t-body-sm t--shadow t--muted mt-lg" style="text-align: center;">
    Four particle layers at different z-depths respond to mouse movement at different speeds, creating true parallax. Move your mouse to see.
  </p>
  <div class="hint-pill mt-xl">move your mouse</div>
</div>

---
transition: fade
---

<!-- NEW SLIDE 1 — Vertical Stat Stack (editorial rhythm, staggered reveals) -->

<CrossMarkers
  :positions="[
    { top: '100px', right: '140px' },
    { bottom: '100px', right: '140px' },
    { top: '50%', right: '140px' }
  ]"
  color="rgba(245, 158, 11, 0.12)"
  :size="24"
  :delay="200"
/>

<div class="layout-left">

<span class="tag">The compression</span>

<div v-click class="mt-xl" style="display: flex; align-items: baseline; gap: var(--space-xl);">
<span class="t-stat-big t--gradient" style="min-width: calc(10rem * var(--cs));">18</span>
<div>
<p class="t-body">months of runway</p>
<p class="t-body-desc t--dim mt-xs">What a seed round used to buy you</p>
</div>
</div>

<DrawLine width="100%" :height="1" color="rgba(245,158,11,0.15)" :delay="800" />

<div v-click style="display: flex; align-items: baseline; gap: var(--space-xl);">
<span class="t-stat-big t--gradient" style="min-width: calc(10rem * var(--cs));">6</span>
<div>
<p class="t-body">weeks to MVP</p>
<p class="t-body-desc t--dim mt-xs">What one person with AI ships now</p>
</div>
</div>

<DrawLine width="100%" :height="1" color="rgba(245,158,11,0.15)" :delay="1400" />

<div v-click style="display: flex; align-items: baseline; gap: var(--space-xl);">
<span class="t-stat-big t--gradient" style="min-width: calc(10rem * var(--cs));">0</span>
<div>
<p class="t-body">permission required</p>
<p class="t-body-desc t--dim mt-xs">The gatekeepers left the building</p>
</div>
</div>

</div>

---
transition: fade
---

<!-- NEW SLIDE 2 — Asymmetric Grid Editorial (text left, giant ghost number right) -->

<div class="slide-grid grid--center">
  <div class="col-7">
    <span class="tag">The leverage moment</span>
    <TextReveal
      text="You don't need
a bigger team."
      class="t-heading"
      :delay="200"
      :stagger="70"
      :duration="800"
    />
    <DrawLine :width="400" :height="2" color="rgba(245,158,11,0.3)" :delay="1100" :duration="700" />
    <p class="t-body-sm mt-md" style="max-width: calc(28rem * var(--cs));">
      The bottleneck was never talent. It was coordination cost. AI collapses the overhead of working together.
    </p>
    <div class="pill-row mt-md">
      <span class="pill">solo founders</span>
      <span class="pill">infinite leverage</span>
      <span class="pill">zero overhead</span>
    </div>
  </div>
  <div class="col-5" style="display: flex; align-items: center; justify-content: center;">
    <span class="t-stat-mega t--gradient" style="opacity: 0.12; font-size: calc(28rem * var(--cs)); line-height: 0.8;">1</span>
  </div>
</div>

---
transition: fade
---

<!-- NEW SLIDE 3 — Dramatic Quote with Vertical Accent (editorial tension) -->

<MouseSpotlight />

<CrossMarkers :count="4" color="rgba(245, 158, 11, 0.1)" :size="28" :delay="300" />

<div style="position: absolute; left: 140px; top: 200px; bottom: 200px;">
  <DrawLine :width="2" height="100%" :delay="200" :duration="1200" direction="left" :vertical="true" color="rgba(245,158,11,0.4)" />
</div>

<div class="layout-center" style="padding-left: calc(4rem * var(--cs));">
  <TextReveal
    text="Everyone has a plan
until the cost of 
execution drops to zero."
    class="t-subheading"
    :delay="400"
    :stagger="60"
    :duration="900"
  />
  <p class="t-attribution mt-lg">
    <span class="accent-line"></span> Not Mike Tyson — but close enough
  </p>
</div>

---
transition: fade
---

<!-- NEW SLIDE 4 — Progression Cards with 3D Background (narrative arc) -->

<MorphingSphere />

<div class="layout-center" style="z-index: 2; position: relative;">

<span class="tag t--shadow">The shift</span>
<h2 class="t-heading t--shadow">What changes when <br>cost hits zero?</h2>

<div class="mt-md" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-lg); max-width: calc(48rem * var(--cs));">

<div class="card" style="text-align: center;">
<span class="t-stat-small t--gradient" style="display: block;">Ideas</span>
<p class="t-body-desc ">become cheap</p>
<p class="t-hint mt-xs">Everyone can generate. Commodity.</p>
</div>

<div class="card" style="text-align: center;">
<span class="t-stat-small t--gradient" style="display: block;">Taste</span>
<p class="t-body-desc ">becomes rare</p>
<p class="t-hint mt-xs">Knowing what to build. Scarce signal.</p>
</div>

<div class="card card--active" style="text-align: center;">
<span class="t-stat-small t--gradient" style="display: block;">Agency</span>
<p class="t-body-desc">becomes everything</p>
<p class="t-hint mt-xs">Actually doing it. The only differentiator.</p>
</div>

</div>

<p class="t-body-sm t--shadow t--muted mt-lg" style="text-align: center;">
The scarcest resource isn't intelligence. It's the willingness to act.
</p>

</div>

---
transition: fade
---

<!-- Settings Panel (last slide) -->

<ControlPanel />
