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
clicks: 1
---

<!-- SLIDE — Gordon Moore looping video background -->

<div style="position: absolute; inset: 0; overflow: hidden; background: #000;">
  <video
    autoplay
    loop
    muted
    playsinline
    style="width: 100%; height: 100%; object-fit: cover;"
    src="/loop-bg.mp4"
  ></video>
  <div v-click="1" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 0 } }" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: calc(3rem * var(--cs)) calc(3rem * var(--cs)); gap: calc(0.3rem * var(--cs));">
    <span v-motion :initial="{ opacity: 0, y: 15 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }" style="font-family: var(--font-display, 'Playfair Display', serif); font-size: calc(2rem * var(--cs)); font-weight: 600; color: #fff; letter-spacing: 0.01em;">Gordon Moore</span>
    <span v-motion :initial="{ opacity: 0, y: 15 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }" style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.8rem * var(--cs)); font-weight: 400; color: rgba(255,255,255,0.6); letter-spacing: 0.08em; text-transform: uppercase;">Intel</span>
    <span v-motion :initial="{ opacity: 0, y: 15 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 } }" style="font-family: var(--font-editorial, 'Cormorant Garamond', serif); font-size: calc(1.1rem * var(--cs)); font-weight: 400; color: rgba(255,255,255,0.85); font-style: italic; margin-top: calc(0.3rem * var(--cs));">"Computing power will double every two years"</span>
  </div>
</div>

---
transition: fade
clicks: 2
---

<!-- SLIDE — Linear vs Exponential -->

<LinearVsExponential :runLinear="$clicks >= 1" :runExp="$clicks >= 2" />

---
transition: fade
clicks: false
---

<!-- SLIDE — Exponential Growth of Computing (Highcharts, click-driven 7 steps) -->

<div style="position: absolute; inset: 0; background: #3a3a3a;">
  <iframe
    src="/exponential_growth_highcharts.html"
    style="width: 100%; height: 100%; border: none;"
    allow="accelerometer; autoplay"
  ></iframe>
</div>

---
transition: fade
clicks: 2
---

<!-- SLIDE — First Gen AI Images -->

<div style="position: absolute; inset: 0; background: #000; display: flex; align-items: center; justify-content: center;">
  <img src="/firstgenimage.png" style="width: 100%; height: 100%; object-fit: contain;" />
  <div v-click="1" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { duration: 600 } }" style="position: absolute; top: calc(1.5rem * var(--cs)); left: 0; right: 0; text-align: center;">
    <span style="font-family: var(--font-editorial, 'Cormorant Garamond', serif); font-size: calc(1.6rem * var(--cs)); font-style: italic; color: var(--color-text, #f0ece4);">"Human face"</span>
  </div>
  <div v-click="2" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { duration: 600 } }" style="position: absolute; bottom: calc(1.5rem * var(--cs)); left: 0; right: 0; text-align: center;">
    <span style="font-family: var(--font-editorial, 'Cormorant Garamond', serif); font-size: calc(1.6rem * var(--cs)); font-style: italic; color: var(--color-text, #f0ece4);">"Dog face"</span>
  </div>
</div>

---
transition: fade
clicks: 5
---

<!-- SLIDE — Midjourney V3–V7 Evolution -->

<div style="position: absolute; inset: 0; background: var(--color-bg, #0a0a0f); display: flex; flex-direction: column; justify-content: center; padding: calc(2rem * var(--cs)) calc(2rem * var(--cs));">

<div style="display: flex; gap: calc(0.4rem * var(--cs)); align-items: flex-start; width: 100%;">

<div v-click="1" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v3.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">July 2022</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V3</span>
</div>

<div v-click="2" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v4.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">November 2022</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V4</span>
</div>

<div v-click="3" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v5.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">March 2023</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V5</span>
</div>

<div v-click="4" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v6.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">December 2023</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V6</span>
</div>

<div v-click="5" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v7.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">August 2025</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V7</span>
</div>

</div>

<p style="position: absolute; bottom: calc(1.5rem * var(--cs)); left: calc(2rem * var(--cs)); right: calc(2rem * var(--cs)); font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.55rem * var(--cs)); color: var(--color-text-dim, #5a5668); text-align: center; line-height: 1.6;">Detailed photograph of a white man in his 40s wearing a striped cowboy hat. The man has a smirk on his face.</p>

</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Cowboy looping video -->

<LoopVideo src="/cowboy-video.mp4" />

---
transition: fade
clicks: false
---

<!-- SLIDE — Principle 1 -->

<div class="layout-center" style="padding-left: var(--pad-compact) !important; padding-right: var(--pad-compact) !important; gap: 0;">
  <span class="tag mb-lg">Principle One</span>
  <TextReveal text="You can predict the direction." class="t-subheading-sm" />
  <TextReveal text="You can't predict the distance." class="t-subheading-sm" :delay="800" />
</div>

---
transition: fade
clicks: false
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

---
transition: fade
clicks: false
---

<!-- SLIDE — Participation Atlas -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://participationatlas.com" title="participationatlas.com" width="66%" height="120%" :zoom="0.75" top="5%">
    <iframe
      src="https://participationatlas.com"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Peppery -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://app.peppery.pro" title="app.peppery.pro" width="66%" height="120%" :zoom="0.75" top="5%">
    <iframe
      src="https://app.peppery.pro"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Catalyst Board -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://catalyst-board.up.railway.app" title="catalyst-board.up.railway.app" width="66%" height="120%" :zoom="0.75" top="5%">
    <iframe
      src="https://catalyst-board.up.railway.app/"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — TheMany Forecasting -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://forecasting.themany.com" title="forecasting.themany.com" width="66%" height="120%" :zoom="0.75" top="5%">
    <iframe
      src="https://forecasting.themany.com"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Frontend Dashboard -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://frontend-staging-4570.up.railway.app/dashboard" title="frontend-staging" width="66%" height="120%" :zoom="0.75" top="5%">
    <iframe
      src="https://frontend-staging-4570.up.railway.app/dashboard"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
    ></iframe>
  </BrowserFrame>
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — TravelOS (iPhone frame) -->

<div class="layout-center">
  <IPhoneFrame url="https://flutter-web-production-f337.up.railway.app" />
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — ADP Catering (iPhone frame) -->

<div class="layout-center">
  <IPhoneFrame url="https://adpcatering.onrender.com/order?token=855088e0-d2b3-4502-a993-a9f28ee93e64" />
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — PX Engine -->

<div class="browser-frame-slide">
  <BrowserFrame url="https://pxengine.ai" title="pxengine.ai" width="66%" height="120%" :zoom="0.75" top="5%">
    <iframe
      src="https://pxengine.ai"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
    ></iframe>
  </BrowserFrame>
</div>
