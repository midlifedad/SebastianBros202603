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
