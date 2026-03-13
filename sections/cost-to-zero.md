---
transition: fade
---

<!-- SLIDE — The Recursive Loop (3D Helix) -->

<RecursiveHelix />

<div class="layout-overlay layout-overlay--center-right">
  <span class="tag t--shadow">The recursive loop</span>
  <div class="t-subheading t--shadow">
    Using the technology to improve<br> how we use the technology.
  </div>
</div>

---
transition: fade
clicks: 1
---

<!-- SLIDE — 160 man-weeks vs 10 weeks -->

<div class="layout-center" style="gap: 0;">

<span class="tag anim-fade-in mb-lg">The ten projects</span>

<TextReveal text="Estimated human development time:" class="t-body t--muted" :delay="200" :stagger="30" />

<TextReveal text="160 working weeks." class="t-subheading-sm mt-sm" :delay="1000" :stagger="60" />

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="1800" />

<div v-click="1" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }" style="margin-top: var(--space-xl); text-align: center;">
  <p class="t-body t--muted">Reality was</p>
  <p class="t-subheading-sm t--gradient mt-sm">8 intense weeks.</p>
</div>

</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Principle 4 -->

<div class="layout-center" style="padding-left: var(--pad-compact) !important; padding-right: var(--pad-compact) !important; gap: 0;">
  <span class="tag mb-lg">Principle Four</span>
  <TextReveal text="Costs trend to zero." class="t-subheading-sm" />
</div>
