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
clicks: 1
---

<!-- SLIDE — 26x around the Earth (looping video background) -->

<div style="position: absolute; inset: 0; overflow: hidden; background: #000;">
  <video
    autoplay
    loop
    muted
    playsinline
    style="width: 100%; height: 100%; object-fit: cover;"
    src="/26x-earth.mp4"
  ></video>
  <div v-click="1" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 800 } }" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
    <span style="font-family: var(--font-display, 'Playfair Display', serif); font-size: calc(4rem * var(--cs)); font-weight: 600; color: #fff; text-shadow: 0 2px 40px rgba(0,0,0,0.6);">26× around the Earth</span>
  </div>
</div>

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
clicks: 6
---

<!-- SLIDE — Midjourney V3–V7 Evolution -->

<div style="position: absolute; inset: 0; background: var(--color-bg, #0a0a0f); display: flex; flex-direction: column; justify-content: center; padding: calc(2rem * var(--cs)) calc(2rem * var(--cs));">

<div v-click="1" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { duration: 600 } }" style="position: absolute; top: calc(1.5rem * var(--cs)); left: 0; right: 0; text-align: center;">
  <span style="font-family: var(--font-editorial, 'Cormorant Garamond', serif); font-size: calc(1.6rem * var(--cs)); font-style: italic; color: var(--color-text, #f0ece4);">"Detailed photograph of a white man in his 40s wearing a striped cowboy hat.<br> The man has a smirk on his face."</span>
</div>

<div style="display: flex; gap: calc(0.4rem * var(--cs)); align-items: flex-start; width: 100%;">

<div v-click="2" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v3.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">July 2022</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V3</span>
</div>

<div v-click="3" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v4.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">November 2022</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V4</span>
</div>

<div v-click="4" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v5.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">March 2023</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V5</span>
</div>

<div v-click="5" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v6.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">December 2023</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V6</span>
</div>

<div v-click="6" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: calc(0.4rem * var(--cs));">
  <div style="width: 100%; aspect-ratio: 1; border-radius: calc(0.2rem * var(--cs)); overflow: hidden; background: var(--color-surface, #22222e);"><img src="/v7.png" style="width: 100%; height: 100%; object-fit: cover;" /></div>
  <span style="font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif); font-size: calc(0.7rem * var(--cs)); color: var(--color-text, #f0ece4); font-weight: 500;">August 2025</span>
  <span style="font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: calc(0.5rem * var(--cs)); color: var(--color-text-dim, #5a5668);">Midjourney V7</span>
</div>

</div>

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
