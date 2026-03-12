<!-- SLIDE — Section Divider: The Price Collapse -->

<div class="layout-center section-line">

# The Price Collapse

<p class="t-body t--muted mt-lg">When the cost of everything approaches zero</p>

</div>

---
transition: fade
---

<!-- SLIDE — "Cost approaching zero" -->

<MouseSpotlight :radius="400" :opacity="0.04" />

<CrossMarkers :count="4" color="rgba(245, 158, 11, 0.1)" :size="28" :delay="300" />

<div class="layout-center">

<TextReveal
  text="The cost of creating anything"
  class="t-heading"
  :delay="400"
  :stagger="60"
  :duration="800"
/>

<TextReveal
  text="digital is approaching zero."
  class="t-heading t--gradient"
  :delay="1600"
  :stagger="60"
  :duration="800"
/>

</div>

---
transition: fade
---

<!-- SLIDE — Art Comparison (Placeholder — add actual images) -->

<div class="layout-center">

<span class="tag anim-fade-in">The comparison</span>

<div class="mt-lg" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); max-width: calc(48rem * var(--cs));">

<div v-click class="card" style="text-align: center; padding: var(--space-md);">
<div style="width: 100%; height: calc(16rem * var(--cs)); background: var(--color-surface); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
<p class="t-hint">Digital art A</p>
</div>
<p class="t-body-sm t--muted mt-sm">Months of labor. Sold for $1M+</p>
</div>

<div v-click class="card" style="text-align: center; padding: var(--space-md);">
<div style="width: 100%; height: calc(16rem * var(--cs)); background: var(--color-surface); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
<p class="t-hint">Digital art B</p>
</div>
<p class="t-body-sm t--muted mt-sm">Made in 3 minutes.</p>
</div>

</div>

<p v-click class="t-body t--muted mt-lg" style="text-align: center;">Can you tell which is which?</p>

<p class="t-hint anim-fade-in d-3000 mt-sm">TODO: Add actual art images to /public/images/</p>

</div>

---
transition: fade
---

<!-- SLIDE — The Chain: Knowledge Work -->

<div class="layout-left">

<span class="tag anim-fade-in">The deliverable layer</span>

<TextReveal text="Digital costs → Knowledge work" class="t-heading" :delay="200" :stagger="50" />

<DrawLine width="100%" :height="1" color="rgba(245,158,11,0.15)" :delay="1000" />

<div class="mt-lg">
<v-clicks>

- Legal work — contracts and case research in minutes
- Tax advisory — structures optimized autonomously
- Banking — credit analysis faster than analyst teams
- Real estate — feasibility studies in seconds, not weeks

</v-clicks>
</div>

<blockquote v-click class="mt-md">
  <p>"The deliverable layer is being commoditized. The value shifts to judgment. Relationships. Trust."</p>
</blockquote>

</div>

---
transition: fade
---

<!-- SLIDE — Physical + Energy -->

<div class="layout-left">

<span class="tag anim-fade-in">Beyond digital</span>

<div class="mt-xl" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); width: 100%;">

<div v-click>
<h3 class="t-label mb-sm" style="color: var(--color-accent);">Physical</h3>
<p class="t-body-sm">3D printing at home: <span class="accent">$3</span> vs $20</p>
<p class="t-body-desc t--dim mt-xs">Humanoid robots: deployed in warehouses now</p>
</div>

<div v-click>
<h3 class="t-label mb-sm" style="color: var(--color-accent);">Energy</h3>
<p class="t-body-sm">Solar: down <span class="accent">90-95%</span> in two decades</p>
<p class="t-body-desc t--dim mt-xs">Fusion: first credible timelines. Battery storage: collapsing.</p>
</div>

</div>

<p v-click class="t-body t--italic mt-xl" style="text-align: center; width: 100%;">
  If energy approaches zero — <span class="accent">everything</span> approaches zero.
</p>

</div>

---
transition: fade
---

<!-- SLIDE — The Exception: Scarcity -->

<MouseSpotlight :radius="400" :opacity="0.04" />

<div class="layout-center">

<TextReveal
  text="You can't 3D print this view."
  class="t-heading"
  :delay="400"
  :stagger="60"
  :duration="800"
/>

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="1400" />

<p class="t-body t--muted anim-fade-in d-2000 mt-xl" style="max-width: calc(32rem * var(--cs)); text-align: center;">
  True scarcity — location, time, singular relationship, irreplaceable talent — persists.
</p>

<p class="t-hint anim-fade-in d-3000 mt-sm">TODO: Add photo of Blackcomb from the window</p>

</div>
