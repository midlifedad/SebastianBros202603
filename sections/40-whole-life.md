<!-- SLIDE — "Everything" opener -->

<div class="layout-center">

<TextReveal text="So what does" class="t-body t--muted" :delay="400" :stagger="40" />

<TextReveal text="everything" class="t-display t--gradient mt-sm" :delay="1000" :stagger="100" :duration="800" />

<TextReveal text="actually mean?" class="t-body t--muted mt-sm" :delay="2200" :stagger="40" />

</div>

---
transition: fade
---

<!-- SLIDE — Business (brief callback) -->

<div class="layout-left">

<span class="tag anim-fade-in">Business</span>

<TextReveal text="The agency model — reinvented." class="t-heading" :delay="200" :stagger="50" />

<p class="t-body t--muted anim-fade-in d-1200 mt-lg" style="max-width: calc(32rem * var(--cs));">
  Organized around scarcity of creative production. Entire departments that existed because making things was hard and slow.
</p>

<p v-click class="t-body mt-lg" style="max-width: calc(32rem * var(--cs));">
  Reinvented — in practice — in the last twelve months. Using the same tools to accelerate the reinvention.
</p>

</div>

---
transition: fade
---

<!-- SLIDE — Personal Expression: The Song -->

<MouseSpotlight :radius="400" :opacity="0.04" />

<div class="layout-center">

<span class="tag anim-fade-in">Personal expression</span>

<TextReveal text="A poem became a song." class="t-heading" :delay="300" :stagger="60" :duration="800" />

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="1200" />

<p class="t-body t--muted anim-fade-in d-2000 mt-xl" style="max-width: calc(32rem * var(--cs)); text-align: center;">
  Performed live. For a hundred people. At Monica's 50th birthday.
</p>

<p v-click class="t-body-sm t--italic mt-lg" style="max-width: calc(32rem * var(--cs)); text-align: center;">
  The gap between what I felt and what I could make — closed.
</p>

</div>

---
transition: fade
---

<!-- SLIDE — The Hot Dog Cart -->

<CrossMarkers
  :positions="[{ top: '100px', right: '140px' }]"
  color="rgba(245, 158, 11, 0.08)"
  :size="24"
  :delay="300"
/>

<div class="layout-left">

<span class="tag anim-fade-in">Age 14</span>

<TextReveal text="The hot dog cart." class="t-heading" :delay="300" :stagger="70" :duration="800" />

<div class="mt-lg" style="max-width: calc(36rem * var(--cs));">

<p v-click class="t-body">Dad's suggestion: rent a cart, sell hot dogs, learn business.</p>

<p v-click class="t-body mt-md">My idea: <em>build</em> the cart. I had sketches. I wanted it to be mine.</p>

<p v-click class="t-body t--muted mt-md">
  <em>"If you spend the summer building the cart, you never sell a hot dog."</em>
</p>

</div>

</div>

---
transition: fade
---

<!-- SLIDE — "Creative audacity got buried" -->

<div class="layout-center">

<TextReveal
  text="I took that lesson to heart."
  class="t-body t--muted"
  :delay="400"
  :stagger="40"
/>

<TextReveal
  text="For thirty-five years."
  class="t-heading t--gradient mt-lg"
  :delay="1600"
  :stagger="80"
  :duration="800"
/>

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="2600" />

<p class="t-body t--muted anim-fade-in d-3200 mt-xl" style="max-width: calc(32rem * var(--cs)); text-align: center;">
  The creative audacity got buried under practicality.
</p>

</div>

---
transition: fade
---

<!-- SLIDE — "Today I could build that cart" -->

<MouseSpotlight />

<div class="layout-center">

<TextReveal
  text="Today I could build that cart."
  class="t-heading"
  :delay="400"
  :stagger="60"
  :duration="800"
/>

<p v-click class="t-body t--muted mt-xl" style="max-width: calc(32rem * var(--cs)); text-align: center;">
  Exactly what I sketched. And still sell hot dogs all summer.
</p>

</div>

---
transition: fade
---

<!-- SLIDE — The Daughter -->

<CrossMarkers
  :positions="[
    { top: '100px', left: '140px' },
    { bottom: '100px', right: '140px' }
  ]"
  color="rgba(245, 158, 11, 0.08)"
  :size="24"
  :delay="300"
/>

<div class="layout-center">

<span class="tag anim-fade-in">The next generation</span>

<TextReveal text="She sketches." class="t-subheading" :delay="300" :stagger="60" />

<TextReveal text="Characters become illustrations." class="t-subheading mt-sm" :delay="1000" :stagger="40" />

<TextReveal text="We're making a book." class="t-subheading t--gradient mt-sm" :delay="1800" :stagger="60" />

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="2600" />

<p class="t-body t--muted anim-fade-in d-3200 mt-xl" style="max-width: calc(32rem * var(--cs)); text-align: center;">
  She's growing up in a world where creative audacity doesn't carry a practical penalty.
</p>

</div>

---
transition: fade
---

<!-- SLIDE — "If you have a brain, you're an artist" -->

<MouseSpotlight />

<div class="layout-center">

<TextReveal
  text="Nike says: if you have a body,"
  class="t-body t--muted"
  :delay="400"
  :stagger="35"
/>

<TextReveal
  text="you're an athlete."
  class="t-body t--muted mt-xs"
  :delay="1200"
  :stagger="35"
/>

<div class="mt-2xl">
<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="2000" />
</div>

<TextReveal
  text="If you have a brain,"
  class="t-heading mt-xl"
  :delay="2800"
  :stagger="60"
  :duration="800"
/>

<TextReveal
  text="you're an artist."
  class="t-heading t--gradient mt-sm"
  :delay="3600"
  :stagger="80"
  :duration="800"
/>

</div>

---
transition: fade
---

<!-- SLIDE — "How do I prepare my kids" -->

<div class="layout-center">

<span class="tag anim-fade-in">The question everyone asks</span>

<TextReveal text="How do I prepare my kids?" class="t-heading" :delay="400" :stagger="60" />

<DrawLine :width="200" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="1400" />

<div class="mt-xl" style="max-width: calc(32rem * var(--cs)); text-align: center;">
<p v-click class="t-body">Keep them human. Let them play. Let them create.</p>
<p v-click class="t-body mt-md">And when they come to you with a crazy idea — <span class="accent">help them try it.</span></p>
</div>

<p v-click class="t-body-sm t--italic t--muted mt-xl" style="text-align: center;">
  For the first time in human history, the world can keep up with a child's imagination.
</p>

</div>
