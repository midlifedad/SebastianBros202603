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
