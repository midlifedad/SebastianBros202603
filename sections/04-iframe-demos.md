<!-- SLIDE — Embedded Website: Interactive Globe (test iframe) -->

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

<!-- SLIDE — Embedded Website: Creative coding (test iframe 2) -->

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

<!-- SLIDE — Two Column Layout test -->

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

<!-- SLIDE — Embedded Website: NASA Solar System (test iframe 3) -->

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

<!-- SLIDE — Embedded Website: youam.network -->

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

<!-- SLIDE — Embedded Website: clawlink.network -->

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

<!-- SLIDE — Side by Side: youam + clawlink -->

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
