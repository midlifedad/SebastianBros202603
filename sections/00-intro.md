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
