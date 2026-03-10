<!-- ============================================================
     SLIDES 2-3 DRAFT — Section 1: "A New Medium"

     DESIGN RATIONALE:

     Slide 2 (The Google Way — Manual Baseline):
     Asymmetric grid (col-5 text / col-7 visual). Left side anchors
     with the section tag and a narrative heading ("Google his name").
     Right side builds a stylized search mockup: a pill-shaped search
     bar appears first, then 3 result cards cascade in via v-click —
     each card slightly delayed to evoke the tedium of clicking
     through results one by one. URLs rendered in --color-teal for
     familiar "link" feel without breaking the palette.
     - No CrossMarkers — intentionally bare. This is the boring,
       manual baseline. No flair.
     - Compact card padding (space-sm) — these are search snippets,
       not rich panels.
     - t-heading for the heading — moderate impact, not commanding.
       This level doesn't deserve display-scale typography.
     - 4-beat v-click: search bar → result 1 → result 2 → result 3

     Slide 3 (Level 1 — ChatGPT):
     Same asymmetric grid (col-5 / col-7) for visual consistency
     across the section. Left side escalates with "Level 1" tag.
     Right side shows two cards: a prompt (card--active, amber
     border = user input) followed by a structured response (regular
     card with 3 labeled sections). The contrast is immediate —
     one input, one organized output vs. Slide 2's click-click-click.
     - 1 CrossMarker (subtle, top-right) — first hint of AI
       sophistication entering the visual language
     - card--active for prompt = user's voice (warm/amber)
     - Regular card for response = AI's organized output
     - Section labels inside response card use t-label to show
       structure that Google results completely lack
     - 2-beat v-click: prompt → response (simple cause → effect)

     ESCALATION SIGNALS (slide 2 → slide 3):
     - CrossMarkers: 0 → 1 (ambient energy emerging)
     - Card count: 4 items → 2 items (efficiency gain)
     - Card style: all regular → card--active for input
     - Input format: search bar (one field) → prompt card (paragraph)
     - Output format: 3 separate snippets → 1 structured response
     - Visual message: scattered fragments → organized whole
     ============================================================ -->

---
transition: fade
---

<!-- SLIDE — The Google Way (Section 1: A New Medium) -->

<div class="slide-grid grid--center">

<div class="col-5" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">

<span class="tag">A New Medium</span>

<TextReveal text="Google his name" class="t-heading" :delay="200" :stagger="50" />

<DrawLine :width="280" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="800" />

<p class="t-body-sm mt-lg" style="max-width: calc(24rem * var(--cs));">
  Type a name. Skim ten blue links. Click through. Read. Come back. Try the next one.
</p>

</div>

<div class="col-7" style="display: flex; flex-direction: column; gap: var(--space-sm); position: relative;">

<div v-click style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 100px; padding: var(--space-xs) var(--space-lg); display: flex; align-items: center; gap: var(--space-sm);">
  <span class="t-hint">search</span>
  <span class="t-body-sm" style="color: var(--color-text) !important;">Dirk Sebastian</span>
</div>

<div v-click class="card" style="padding: var(--space-sm) var(--space-lg); justify-content: flex-start;">
<div>
<span class="t-label" style="color: var(--color-teal);">linkedin.com/in/dirk-sebastian</span>
<h3 class="t-panel-title mt-xs" style="color: var(--color-text) !important; text-transform: none; letter-spacing: -0.02em;">Dirk Sebastian — Managing Partner</h3>
<p class="t-body-desc mt-xs">Co-founded Sebastian Group. European private wealth, family office advisory...</p>
</div>
</div>

<div v-click class="card" style="padding: var(--space-sm) var(--space-lg); justify-content: flex-start;">
<div>
<span class="t-label" style="color: var(--color-teal);">bloomberg.com/profile/dirk-sebastian</span>
<h3 class="t-panel-title mt-xs" style="color: var(--color-text) !important; text-transform: none; letter-spacing: -0.02em;">Executive Profile — Bloomberg</h3>
<p class="t-body-desc mt-xs">Board positions, transaction history, related news articles...</p>
</div>
</div>

<div v-click class="card" style="padding: var(--space-sm) var(--space-lg); justify-content: flex-start;">
<div>
<span class="t-label" style="color: var(--color-teal);">crunchbase.com/person/dirk-sebastian</span>
<h3 class="t-panel-title mt-xs" style="color: var(--color-text) !important; text-transform: none; letter-spacing: -0.02em;">Dirk Sebastian — Investments</h3>
<p class="t-body-desc mt-xs">Portfolio companies, funding rounds, co-investors...</p>
</div>
</div>

</div>

</div>

---
transition: fade
---

<!-- SLIDE — Level 1: ChatGPT (Section 1: A New Medium) -->

<CrossMarkers
  :positions="[
    { top: '100px', right: '160px' }
  ]"
  color="rgba(245, 158, 11, 0.06)"
  :size="22"
  :delay="500"
/>

<div class="slide-grid grid--center">

<div class="col-5" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">

<span class="tag">Level 1 · ChatGPT</span>

<TextReveal text="Give it context" class="t-heading" :delay="200" :stagger="50" />

<DrawLine :width="260" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="800" />

<p class="t-body-sm mt-lg" style="max-width: calc(24rem * var(--cs));">
  One prompt. One structured answer. Already better than an hour of clicking.
</p>

</div>

<div class="col-7" style="display: flex; flex-direction: column; gap: var(--space-sm); position: relative;">

<div v-click class="card card--active" style="padding: var(--space-md) var(--space-lg); justify-content: flex-start;">
<span class="t-label mb-sm" style="color: var(--color-text-dim);">You</span>
<p class="t-body-xs" style="color: var(--color-text) !important;">
  I'm presenting at a family reunion hosted by the Sebastian brothers next week. Help me prepare — who is Dirk Sebastian, what's his background, what does he invest in, and any recent news I should know about?
</p>
</div>

<div v-click class="card" style="padding: var(--space-md) var(--space-lg); justify-content: flex-start; gap: var(--space-sm);">
<span class="t-label mb-xs">ChatGPT</span>
<div>
<span class="t-label" style="color: var(--color-text-dim);">Background</span>
<p class="t-body-desc mt-xs">Co-founded Sebastian Group (2015). Former Deutsche Bank investment director. 20+ years in European private wealth and family office advisory.</p>
</div>
<div>
<span class="t-label" style="color: var(--color-text-dim);">Investment Focus</span>
<p class="t-body-desc mt-xs">Family offices, private equity co-investments, sustainable real estate and PropTech. Active in European mid-market.</p>
</div>
<div>
<span class="t-label" style="color: var(--color-text-dim);">Recent Activity</span>
<p class="t-body-desc mt-xs">Led seed round in GreenBridge Capital (2025). Spoke at European Family Office Forum on next-gen wealth transfer.</p>
</div>
</div>

</div>

</div>
