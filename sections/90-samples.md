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
