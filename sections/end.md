---
transition: fade
clicks: false
---

<div style="position: absolute; inset: 0; background: #000;"></div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Dreamgirl -->

<div style="position: absolute; inset: 0; background: #000; display: flex; align-items: center; justify-content: center;">
  <img src="/dreamgirl.jpg" style="width: 100%; height: 100%; object-fit: contain;" />
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Dream Girl Audio Player -->

<div style="position: absolute; inset: 0; background: #000; display: flex; align-items: center; justify-content: center;">
  <audio id="dreamgirl-audio" src="/dreamgirl2.mp3" preload="auto" controls style="width: calc(24rem * var(--cs)); height: calc(2.5rem * var(--cs)); filter: invert(1) hue-rotate(180deg) brightness(0.9);"></audio>
</div>

---
transition: fade
clicks: false
---

<!-- SLIDE — Blank -->

<div style="position: absolute; inset: 0; background: #000;"></div>

---
transition: fade
clicks: 2
---

<!-- SLIDE — Unicorn dissolve (fade through black, then blend) -->

<div style="position: absolute; inset: 0; background: #000;">
  <img src="/unicorn1.jpeg" :class="{ 'unicorn-hide': $clicks >= 1 }" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; transition: opacity 1.5s ease;" />
  <img src="/unicorn2.jpeg" :class="{ 'unicorn-show': $clicks >= 1 }" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity 1.5s ease 1.5s;" />
  <img src="/unicorn3.jpeg" :class="{ 'unicorn-show': $clicks >= 2 }" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity 2s ease;" />
</div>

<style>
.unicorn-hide { opacity: 0 !important; }
.unicorn-show { opacity: 1 !important; }
</style>

---
transition: fade
clicks: false
---

<!-- SLIDE — Unicorn 4 (full bleed) -->

<div style="position: absolute; inset: 0; background: #000;">
  <img src="/unicorn4.jpeg" style="width: 100%; height: 100%; object-fit: cover;" />
</div>
