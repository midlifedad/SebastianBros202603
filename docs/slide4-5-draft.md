<!-- ============================================================
     SLIDES 4-5 DRAFT — Section 1: "A New Medium"

     DESIGN RATIONALE:

     Slide 4 (Level 2 — Deep Research / Early Agentic):
     Two-column grid (col-5 input / col-7 output). Left side builds
     the input picture: 5 source pills showing the breadth of what
     feeds into Deep Research. Right side reveals 3 structured output
     cards appearing together. The heading "Research all of these
     people" captures the instruction you'd give the AI — a complex
     multi-source request. Time label ("~45 min · autonomous · parallel")
     contextualizes the processing.
     - Minimal CrossMarkers (1 position) — restrained decoration
     - Regular .card styling for research-grade outputs
     - t-subheading-sm heading — moderate impact
     - 3-beat v-click: inputs → processing context → output reveal

     Slide 5 (Level 3 — Fully Agentic / Perplexity Computer):
     Same two-column structure but ESCALATED. Column ratio shifts to
     col-4/col-8 — the output side visually dominates. 7 input pills
     (tighter gap, wrapping dense) vs slide 4's 5. card--active styling
     with accent borders signals these aren't research suggestions —
     they're finished production artifacts. The pivot line "Not
     suggestions. The thing itself." is the conceptual thesis.
     - 3 CrossMarkers (more ambient energy)
     - card--active with accent borders + gradient bg
     - t-subheading heading (larger than slide 4)
     - Same 3-beat build but bigger payoff on output reveal

     ESCALATION SIGNALS (slide 4 → slide 5):
     - Pill count: 5 → 7 (denser inputs)
     - Pill gap: space-sm → space-xs (tighter packing)
     - Card style: .card → .card--active (accent treatment)
     - Column split: 5/7 → 4/8 (output dominates)
     - Heading size: t-subheading-sm → t-subheading
     - CrossMarkers: 1 → 3
     - Output labels: categories → "Delivered"
     - Key contrast: same "Presentation" category appears in both
       slides — "Talking Points" (suggestions) vs "A New Presentation"
       (the actual finished artifact)
     ============================================================ -->

---
transition: fade
---

<!-- SLIDE 4 — Level 2: Deep Research / Early Agentic -->

<CrossMarkers
  :positions="[
    { top: '90px', right: '140px' }
  ]"
  color="rgba(245, 158, 11, 0.08)"
  :size="24"
  :delay="400"
/>

<div class="slide-grid grid--center">

<div class="col-5" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">

<span class="tag">Level 2 · Deep Research</span>

<TextReveal text="Research all of these people" class="t-subheading-sm" :delay="200" :stagger="50" />

<DrawLine :width="320" :height="2" color="rgba(245, 158, 11, 0.25)" :delay="900" />

<div v-click class="pill-row mt-lg" style="flex-wrap: wrap;">
<span class="pill">Attendee List</span>
<span class="pill">Google Slides Link</span>
<span class="pill">LinkedIn Profiles</span>
<span class="pill">Company Intel</span>
<span class="pill">Recent News</span>
</div>

<p v-click class="t-hint mt-md"><span class="t--accent">~45 min</span> · autonomous · parallel</p>

</div>

<div class="col-7" style="display: flex; align-items: center;">

<div v-click style="display: flex; flex-direction: column; gap: var(--space-sm); width: 100%;">
<span class="t-label mb-sm">What Comes Back</span>
<div class="card" style="padding: var(--space-md) var(--space-lg);">
<span class="t-label mb-xs">Per Attendee</span>
<h3 class="t-panel-title mb-xs">Individual Briefings</h3>
<p class="t-body-desc">Background, role, interests, conversation openers</p>
</div>
<div class="card" style="padding: var(--space-md) var(--space-lg);">
<span class="t-label mb-xs">Presentation</span>
<h3 class="t-panel-title mb-xs">Talking Points</h3>
<p class="t-body-desc">Audience-tailored angles for each slide</p>
</div>
<div class="card" style="padding: var(--space-md) var(--space-lg);">
<span class="t-label mb-xs">Networking</span>
<h3 class="t-panel-title mb-xs">Connection Map</h3>
<p class="t-body-desc">Shared interests, mutual contacts, warm intros</p>
</div>
</div>

</div>

</div>

---
transition: fade
---

<!-- SLIDE 5 — Level 3: Fully Agentic / Perplexity Computer -->

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

<div class="slide-grid grid--center">

<div class="col-4" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">

<span class="tag">Level 3 · Fully Agentic</span>

<TextReveal text="I pasted the email" class="t-subheading" :delay="200" :stagger="60" />

<DrawLine :width="280" :height="2" color="rgba(245, 158, 11, 0.3)" :delay="900" />

<div v-click class="pill-row mt-lg" style="flex-wrap: wrap; gap: var(--space-xs);">
<span class="pill">Email Thread</span>
<span class="pill">Deck Link</span>
<span class="pill">Attendee List</span>
<span class="pill">Event Transcript</span>
<span class="pill">Past Talks</span>
<span class="pill">Speaker Bio</span>
<span class="pill">Calendar</span>
</div>

<p v-click class="t-body-sm t--muted mt-md">Not suggestions. <span class="t--accent">The thing itself.</span></p>

</div>

<div class="col-8" style="display: flex; align-items: center;">

<div v-click style="display: flex; flex-direction: column; gap: var(--space-sm); width: 100%;">
<span class="t-label mb-sm">Delivered</span>
<div class="card card--active" style="padding: var(--space-md) var(--space-lg);">
<span class="t-label mb-xs">Presentation</span>
<h3 class="t-panel-title mb-xs">A New Presentation</h3>
<p class="t-body-desc">Complete slide deck tailored to this audience, ready to deliver</p>
</div>
<div class="card card--active" style="padding: var(--space-md) var(--space-lg);">
<span class="t-label mb-xs">Application</span>
<h3 class="t-panel-title mb-xs">Companion App Spec</h3>
<p class="t-body-desc">Interactive attendee resource with personalized content</p>
</div>
<div class="card card--active" style="padding: var(--space-md) var(--space-lg);">
<span class="t-label mb-xs">Follow-Up</span>
<h3 class="t-panel-title mb-xs">Personalized Packages</h3>
<p class="t-body-desc">Per-attendee follow-ups, research briefs, and action items</p>
</div>
</div>

</div>

</div>
