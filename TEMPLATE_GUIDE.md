# The Wrong Rubric — Slide Authoring Guide

Reference for building slides using the design system. Slides are composed from reusable tokens — no per-slide CSS needed.

---

## Quick Reference

```
TYPOGRAPHY (headings)                SPACING              LAYOUT
.t-display     5.5rem  ~172px       .mt-xs   0.5rem      .layout-center
.t-display-sm  5rem    ~157px       .mt-sm   0.75rem     .layout-left
.t-title       4.5rem  ~141px       .mt-md   1rem        .layout-right
.t-heading     4rem    ~125px       .mt-lg   1.5rem      .layout-bottom-left
.t-subheading  3.5rem  ~110px       .mt-xl   2rem        .layout-center-right
.t-subheading-sm 3.2rem ~100px      .mt-2xl  2.5rem      .layout-split
.t-quote       5.5rem  ~172px i     .mt-3xl  3rem        .layout-split-stat
.t-body        1.3rem  ~41px        .mt-4xl  4rem        .layout-grid-4
.t-body-sm     1.1rem  ~34px                              .layout-bleed
.t-body-xs     1rem    ~31px        Also: mb-*, ml-*,    TEXT ALIGN
.t-body-desc   0.75rem ~24px        mr-*, px-*, py-*     .text-center
.t-subtitle    1.1rem  ~34px up     (all xs–4xl)          .text-left
.t-attribution 0.85rem ~27px up                           .text-right
.t-tag         0.7rem  ~22px        GAP
.t-label       0.65rem ~20px        .gap-xs … .gap-4xl   OVERLAY POSITIONS
.t-hint        0.65rem ~20px                              --bottom-left
                                    MODIFIERS             --center
                                    .t--italic  .t--gradient   --center-right
                                    .t--accent  .t--muted     --tight
STATS                               .t--dim    .t--shadow
.t-stat-mega   14rem   ~439px       .t--gradient-v  .t--shadow-sm
.t-stat-large  11rem   ~345px
.t-stat-big    8rem    ~251px       COMPONENTS
.t-stat-rolling 6rem   ~188px       .tag  .pill  .card  .stat-block
.t-stat-medium 3.5rem  ~110px       .divider-v  .scrim  .accent-line
.t-panel-title 1.4rem  ~44px        .deco-lines  .line-wrapper  .text-glow
```

---

## How It Works

```
index.css                          TEMPLATE_GUIDE.md (this file)
---------                          -----------------
Token classes                      How to USE those tokens.
(.t-display, .layout-center,       Recipes, decision guidance,
 .slide-grid, .col-*, .tag, .mt-lg)     composition examples.
The building blocks.               The instruction manual.
```

**Slides are authored by composing CSS classes in HTML, not by writing new CSS.**

---

## Quick Start — Anatomy of a Slide

```html
---
transition: fade
---

<div class="layout-left">              <!-- 1. Pick a LAYOUT -->
  <span class="tag">Section 3</span>   <!-- 2. Add COMPONENTS -->

  <TextReveal
    text="Ideas are the only currency that matters"
    class="t-title t--shadow"           <!-- 3. Pick TYPOGRAPHY -->
  />

  <p class="t-body mt-xl">             <!-- 4. Add SPACING -->
    Supporting body text goes here.
  </p>
</div>
```

Every slide: **Layout + Typography + Spacing + Components**.

---

## 1. Grid System

The grid is a **layout reference** — a consistent way to position any content. Text, images, 3D scenes, video, charts, whitespace — anything.

It does NOT determine font sizes. Typography is an independent creative choice.

### Grid Math

| Property | Value |
|----------|-------|
| Canvas | 1920 x 1080px |
| Outer padding | 160px each side |
| Content area | 1600px wide |
| Columns | 12 (`fr` units) |
| Gutter | 24px |

### Column Spans

| Span | Width | Example Uses |
|------|-------|-------------|
| `col-12` | 1600px | Full-width |
| `col-10` | 1330px | Wide with breathing room |
| `col-8` | 1054px | Primary + sidebar |
| `col-6` | 788px | Two equal columns |
| `col-4` | 519px | Three columns |
| `col-3` | 385px | Four-column cards |

Asymmetric works too: 7+5, 9+3, 5+4+3, etc.

### Usage

```html
<div class="slide-grid">
  <div class="col-7">Primary content</div>
  <div class="col-5">Secondary content</div>
</div>
```

### Grid Modifiers

| Modifier | Effect |
|----------|--------|
| `.grid--center` | Vertically center items |
| `.grid--top` | Align items to top |
| `.grid--bottom` | Align items to bottom |
| `.grid--tight` | Compact padding |
| `.grid--bleed` | No padding |

### Grid Is Not Prescriptive

Authors can:
- Use any combination of column spans
- Nest grids within grid cells
- Mix grid with flex layout
- Ignore the grid for full-bleed or overlay slides
- Create layouts that don't map to any template

---

## 2. Layout Tokens (Convenience)

For common patterns, these pre-configured layouts skip the grid:

| Token | Alignment | Use For |
|-------|-----------|---------|
| `.layout-center` | Centered, vertically centered | Quotes, stats, statements |
| `.layout-left` | Left-aligned, vertically centered | Text reveals, editorial |
| `.layout-right` | Right-aligned, vertically centered | Right-anchored editorial |
| `.layout-bottom-left` | Left-aligned, bottom-anchored | 3D overlays (bottom text) |
| `.layout-center-right` | Right-aligned, vertically centered | 3D overlays (right text) |
| `.layout-split` | Two-column grid | Comparisons, theme demos |
| `.layout-split-stat` | Three-column (stat / divider / stat) | Bold stat comparisons |
| `.layout-grid-4` | Four-column card grid | Panel/card layouts |
| `.layout-bleed` | Full-bleed, no padding | 3D backgrounds, video |

These are shortcuts. An author can always use `.slide-grid` + `.col-*` directly for custom arrangements.

### Overlay System (3D/Video Slides)

For slides with background visuals, layer consistently:

```html
<ParticleCurve />                                     <!-- 1. Background -->
<div class="scrim"></div>                              <!-- 2. Legibility scrim -->
<div class="layout-overlay layout-overlay--bottom-left"> <!-- 3. Text overlay -->
  <span class="tag t--shadow">Label</span>
  <h2 class="t-title t--shadow">Heading</h2>
  <p class="t-body-sm t--shadow mt-lg">Body text.</p>
</div>
```

Always use `.t--shadow` on text over visual backgrounds.

**Overlay positions:**

| Modifier | Position |
|----------|----------|
| `.layout-overlay--bottom-left` | Bottom-left corner |
| `.layout-overlay--center` | Dead center |
| `.layout-overlay--center-right` | Center-right |
| `.layout-overlay--tight` | Compact padding (combine with position) |

---

## 3. Typography

Typography tokens are a **creative palette**. Choose based on:
- What the text is saying (punchy statement vs. supporting context)
- The feeling you want (commanding, reflective, understated, dramatic)
- What fits well in the space

The grid does NOT auto-set font sizes. Typography is an independent decision.

### Heading Scale (Cormorant Garamond, weight 400)

| Token | Size | Feel |
|-------|------|------|
| `.t-display` | 5.5rem (~172px) | Maximum impact — hero phrases, single big ideas |
| `.t-display-sm` | 5rem (~157px) | Slightly restrained display |
| `.t-title` | 4.5rem (~141px) | Strong heading — section openers, key statements |
| `.t-heading` | 4rem (~125px) | Standard heading — multi-line content |
| `.t-subheading` | 3.5rem (~110px) | Moderate heading — narrative, longer text |
| `.t-subheading-sm` | 3.2rem (~100px) | Compact heading — dense content slides |

### Quote Style

| Token | Size | Feel |
|-------|------|------|
| `.t-quote` | 5.5rem (~172px) | Large italic editorial — authority quotes |

### Stat Scale (Oversized Numbers)

| Token | Size | Feel |
|-------|------|------|
| `.t-stat-mega` | 14rem (~439px) | Full-slide hero stat |
| `.t-stat-large` | 11rem (~345px) | Split-stat numbers |
| `.t-stat-big` | 8rem (~251px) | Bold display numbers |
| `.t-stat-rolling` | 6rem (~188px) | Rolling/interactive text |
| `.t-stat-medium` | 3.5rem (~110px) | Inline stat rows |
| `.t-panel-title` | 1.4rem (~44px) | Card/panel titles |

### Body Scale (Plus Jakarta Sans, weight 300)

| Token | Size | Color | Feel |
|-------|------|-------|------|
| `.t-body` | 1.3rem (~41px) | muted | Primary readable text |
| `.t-body-sm` | 1.1rem (~34px) | muted | Secondary, descriptions |
| `.t-body-xs` | 1rem (~31px) | muted | Small body, overlay text |
| `.t-body-desc` | 0.75rem (~24px) | muted | Card descriptions, fine print |
| `.t-subtitle` | 1.1rem (~34px) | muted | Uppercase subtitle labels |
| `.t-attribution` | 0.85rem (~27px) | dim | Quote credits |

### Label Scale (JetBrains Mono)

| Token | Size | Color | Feel |
|-------|------|-------|------|
| `.t-tag` | 0.7rem (~22px) | accent | Section tags |
| `.t-label` | 0.65rem (~20px) | accent | Panel/card labels |
| `.t-hint` | 0.65rem (~20px) | dim | Subtle hints |

### Typography Modifiers

Combine with any token:

| Modifier | Effect |
|----------|--------|
| `.t--italic` | Italic |
| `.t--gradient` | Amber-to-red gradient text |
| `.t--gradient-v` | Vertical text fade (white to muted) |
| `.t--accent` | Accent color text |
| `.t--muted` | Muted color text |
| `.t--dim` | Dim color text |
| `.t--shadow` | Heavy text shadow (for 3D/video overlays) |
| `.t--shadow-sm` | Light text shadow |

### No max-width on Typography

Typography tokens do NOT carry `max-width`. The grid column or layout container constrains width naturally. If you want to constrain width for aesthetics, do it on the container.

### Choosing Typography

The right token depends on **content and intent**, not a formula:

- **"Fear says wait."** (3 words, punchy) -> `.t-display` even in a narrow column
- **"The most creative, opportunity-rich moment in history"** (reflective) -> `.t-subheading`
- **"12 agents, 2 months, 1 person"** (data) -> `.t-stat-rolling`
- **"Context explaining the headline above"** -> `.t-body`

If text overflows, either: use a smaller token, use fewer words, or widen the container.

---

## 4. Spacing

### Scale

| Size | Rendered | Margin top | Margin bottom | Margin left | Margin right | Padding x | Padding y |
|------|----------|------------|---------------|-------------|--------------|-----------|-----------|
| 0.5rem | ~16px | `.mt-xs` | `.mb-xs` | `.ml-xs` | `.mr-xs` | `.px-xs` | `.py-xs` |
| 0.75rem | ~24px | `.mt-sm` | `.mb-sm` | `.ml-sm` | `.mr-sm` | `.px-sm` | `.py-sm` |
| 1rem | ~31px | `.mt-md` | `.mb-md` | `.ml-md` | `.mr-md` | `.px-md` | `.py-md` |
| 1.5rem | ~47px | `.mt-lg` | `.mb-lg` | `.ml-lg` | `.mr-lg` | `.px-lg` | `.py-lg` |
| 2rem | ~63px | `.mt-xl` | `.mb-xl` | `.ml-xl` | `.mr-xl` | `.px-xl` | `.py-xl` |
| 2.5rem | ~78px | `.mt-2xl` | `.mb-2xl` | `.ml-2xl` | `.mr-2xl` | `.px-2xl` | `.py-2xl` |
| 3rem | ~94px | `.mt-3xl` | `.mb-3xl` | `.ml-3xl` | `.mr-3xl` | `.px-3xl` | `.py-3xl` |
| 4rem | ~125px | `.mt-4xl` | `.mb-4xl` | `.ml-4xl` | `.mr-4xl` | `.px-4xl` | `.py-4xl` |

### Text Alignment

| Class | Effect |
|-------|--------|
| `.text-center` | `text-align: center` |
| `.text-left` | `text-align: left` |
| `.text-right` | `text-align: right` |

### Gap (flex/grid containers)

`.gap-xs` through `.gap-4xl` — same scale as above

### CSS Variables (for inline styles)

```html
<div style="display: grid; gap: var(--space-lg); padding: var(--space-xl);">
```

Available: `--space-xs` through `--space-4xl`, `--pad-standard`, `--pad-wide`, `--pad-generous`, `--pad-compact`

---

## 5. Components

### CSS Components

| Component | What It Is |
|-----------|-----------|
| `.tag` | Mono uppercase accent label (with bottom margin) |
| `.pill` / `.pill-row` | Bordered capsule tags in a row |
| `.hint-pill` | Subtle dim capsule for hints |
| `.accent-line` | Inline horizontal amber line (for attributions) |
| `.stat-block` / `.stat-row` | Number + label pairs |
| `.stat-label` | Small uppercase label below stats |
| `.card` / `.card--active` | Panel with subtle border, optional accent |
| `.card-number` | Oversized ghost number in card corner |
| `.divider-v` | Vertical amber gradient line |
| `.scrim` | Dark gradient overlay for text legibility over video/3D |
| `.deco-lines` | Container for positioned decorative DrawLines |
| `.section-line` | Top accent line on section dividers |
| `.line-wrapper` | Constrained width container for DrawLine |
| `.text-glow` | Radial dark glow behind text over 3D |
| `.split-context` | Full-width bottom text in split layouts |

### Vue Components — Animation

| Component | What It Does | Key Props |
|-----------|-------------|-----------|
| `<TextReveal>` | Word-by-word mask reveal | `text`, `class`, `delay`, `stagger`, `duration` |
| `<DrawLine>` | Animated line draw-in (replays on re-entry) | `width`, `height`, `color`, `delay`, `duration`, `direction`, `vertical` |
| `<RollingText>` | Hover-triggered character roll | `text`, `color` |
| `<SvgPathDraw>` | Animated SVG curve (replays on re-entry) | `delay`, `duration`, `color`, `strokeWidth` |
| `<CrossMarkers>` | Decorative + markers | `positions` or `count`, `color`, `size`, `delay` |
| `<MouseSpotlight>` | Cursor-following spotlight | (none) |

### Vue Components — 3D (Three.js)

All render as full-bleed backgrounds. Use with `.layout-overlay` for text.

| Component | Visual |
|-----------|--------|
| `<FloatingGeometry>` | Wireframe objects floating at different depths |
| `<MorphingSphere>` | Breathing vertex-displaced sphere |
| `<ParticleCurve>` | Exponential particle curve |
| `<ParticleTunnel>` | Cylindrical fly-through |
| `<RecursiveHelix>` | Recursive helical structure |
| `<ParallaxDepth>` | Mouse-reactive multi-depth particles |

### Vue Components — UI Chrome

| Component | What It Does | Key Props |
|-----------|-------------|-----------|
| `<BrowserFrame>` | macOS browser window for iframes | `url`, `title`, `darkChrome` |
| `<ControlPanel>` | Live settings panel | (none) |

### Vue Components — Inspira UI (copy-paste library)

170+ animated components from [inspira-ui.com](https://inspira-ui.com). Copy-paste architecture — source goes directly into `components/inspira/`. Requires TailwindCSS setup (adapt CSS if needed for our UnoCSS/token system).

**Install a component:**
```bash
npx shadcn-vue@latest add "https://registry.inspira-ui.com/<component-name>.json"
```

**Best candidates for slides:**

| Category | Components | Use For |
|----------|-----------|---------|
| Text Animations | Blur Reveal, Text Generate Effect, Number Ticker, Flip Words, Morphing Text, Hyper Text, Encrypted Text, Letter Pullup, Sparkles Text, Text Highlight | Animated text reveals beyond our TextReveal |
| Backgrounds | Aurora, Particles, Flickering Grid, Ripple, Stars, Silk, Neural, Cosmic Portal, Warp, Vortex | Alternative to our Three.js backgrounds |
| Special Effects | Animated Beam, Border Beam, Meteors, Neon Border, Confetti, Progressive Blur | Accent effects on cards, borders, reveals |
| Visualization | Globe, 3D Carousel, Icon Cloud, Orbit, Logo Cloud, World Map | Data visualization slides |
| Cards | 3D Card Effect, Card Spotlight, Glare Card, Direction Aware Hover | Interactive card layouts |
| Misc | Marquee, Timeline, Compare, Bento Grid, Tracing Beam, Container Scroll | Scrolling content, timelines, comparisons |

**Note:** When adding inspira-ui components, wrap them to use our `--cs` scaling and color tokens rather than Tailwind defaults.

---

## 6. Color Reference

### Text Colors

| Variable | Hex | Use |
|----------|-----|-----|
| `--color-text` | #f0ece4 | Primary headings, body |
| `--color-text-muted` | #8a8698 | Secondary text |
| `--color-text-dim` | #5a5668 | Hints, labels, slide numbers |
| `--color-accent` | #f59e0b | Tags, accent text, borders |

### Extended Palette

`--color-red` `--color-coral` `--color-blue` `--color-sky` `--color-teal` `--color-green` `--color-violet` `--color-rose` `--color-peach`

### Backgrounds

| Variable | Hex | Use |
|----------|-----|-----|
| `--color-bg` | #0a0a0f | Slide background |
| `--color-bg-soft` | #12121a | Card backgrounds |
| `--color-bg-card` | #1a1a26 | Elevated surfaces |
| `--color-surface` | #22222e | Input backgrounds |

---

## 7. Recipes (Copy-Paste)

Ready-to-use skeletons. Paste, swap the content, done.

### Recipe: Quote + Attribution

```html
<div class="layout-center">
  <CrossMarkers :size="28" :delay="400" />
  <p class="t-quote">"The quote text goes here."</p>
  <p class="t-attribution mt-xl">
    <span class="accent-line"></span> Author Name, Title
  </p>
</div>
```

### Recipe: Stat + Label

```html
<div class="layout-center">
  <span class="tag">Context</span>
  <span class="t-stat-mega t--gradient">97%</span>
  <p class="t-subtitle mt-lg">What the number means.</p>
</div>
```

### Recipe: Text Reveal + Line + Body

```html
<div class="layout-left">
  <span class="tag">Section Label</span>
  <TextReveal text="The heading text" class="t-heading" />
  <DrawLine :width="500" :height="2" color="rgba(245,158,11,0.3)" :delay="1200" />
  <TextReveal text="Body paragraph that supports the heading." class="t-body-sm mt-lg" :delay="1400" />
</div>
```

### Recipe: Section Divider

```html
<div class="layout-center">
  <span class="tag">Part 3</span>
  <TextReveal text="Section Title" class="t-title" />
  <p class="t-body mt-xl">One-line description of what follows.</p>
  <DrawLine width="45%" :height="2" color="rgba(245,158,11,0.15)" :delay="1000" />
</div>
```

### Recipe: 3D Overlay

```html
<ParticleCurve />
<CrossMarkers :positions="[
  { top: '120px', left: '160px' },
  { bottom: '120px', right: '160px' }
]" color="rgba(245,158,11,0.12)" :size="28" :delay="400" />
<div class="layout-overlay layout-overlay--bottom-left">
  <span class="tag t--shadow">3D Label</span>
  <TextReveal text="Statement text" class="t-title t--shadow" />
  <p class="t-body-xs t--shadow mt-lg">Supporting context.</p>
</div>
```

### Recipe: Card Grid

```html
<div class="layout-grid-4">
  <CrossMarkers :size="24" :delay="300" />
  <div class="card">
    <div class="card-number">01</div>
    <div>
      <span class="t-label mb-md">Category</span>
      <h3 class="t-panel-title mb-sm">Card Title</h3>
      <p class="t-body-desc">Description text.</p>
    </div>
  </div>
  <div class="card card--active">
    <div class="card-number">02</div>
    <div>
      <span class="t-label mb-md">Category</span>
      <h3 class="t-panel-title mb-sm">Active Card</h3>
      <p class="t-body-desc">This one has accent border.</p>
    </div>
  </div>
  <!-- repeat for 03, 04 -->
</div>
```

### Recipe: Vertical Stat Stack

```html
<div class="layout-left">
<span class="tag">Label</span>

<div v-click class="mt-xl" style="display: flex; align-items: baseline; gap: var(--space-xl);">
<span class="t-stat-big t--gradient" style="min-width: calc(10rem * var(--cs));">18</span>
<div>
<p class="t-body">Primary metric</p>
<p class="t-body-desc t--dim mt-xs">Supporting context</p>
</div>
</div>

<DrawLine width="100%" :height="1" color="rgba(245,158,11,0.15)" :delay="800" />

<!-- repeat stat rows, incrementing v-click delay -->
</div>
```

**Key:** Each stat block at root level (no wrapping `<div>`). v-click at shallow nesting.

### Recipe: Asymmetric Grid + Ghost Number

```html
<div class="slide-grid grid--center">
  <div class="col-7">
    <span class="tag">Label</span>
    <TextReveal text="Heading text" class="t-title" />
    <DrawLine :width="400" :height="2" color="rgba(245,158,11,0.3)" :delay="1100" />
    <p class="t-body mt-xl" style="max-width: calc(36rem * var(--cs));">Body text.</p>
    <div class="pill-row mt-xl">
      <span class="pill">tag 1</span>
      <span class="pill">tag 2</span>
    </div>
  </div>
  <div class="col-5" style="display: flex; align-items: center; justify-content: center;">
    <span class="t-stat-mega t--gradient" style="opacity: 0.12; font-size: calc(28rem * var(--cs)); line-height: 0.8;">1</span>
  </div>
</div>
```

### Recipe: Vertical Accent Line + Quote

```html
<MouseSpotlight />
<CrossMarkers :count="4" color="rgba(245,158,11,0.1)" :size="28" :delay="300" />

<div style="position: absolute; left: calc(72px); top: calc(200px); bottom: calc(200px);">
  <DrawLine :width="2" height="100%" :delay="200" :duration="1200" direction="left" :vertical="true" color="rgba(245,158,11,0.4)" />
</div>

<div class="layout-center" style="padding-left: calc(6rem * var(--cs));">
  <TextReveal text="The quote text goes here." class="t-display-sm" :delay="400" :stagger="60" />
  <p class="t-attribution mt-2xl">
    <span class="accent-line"></span> Attribution
  </p>
</div>
```

---

## 8. Extended Templates

These are **starting points**, not a closed set. Layouts are infinite.

### Centered Statement

```html
<div class="layout-center">
  <p class="t-display">"The big idea."</p>
  <p class="t-body t--muted mt-xl">Context.</p>
</div>
```

### Authority Quote

```html
<div class="layout-center">
  <p class="t-quote">"The quote text goes here."</p>
  <p class="t-attribution mt-xl">
    <span class="accent-line"></span> Author Name, Title
  </p>
</div>
```

### Editorial Left

```html
<div class="layout-left">
  <span class="tag">Section Label</span>
  <TextReveal text="Heading text" class="t-title" />
  <DrawLine :width="400" :height="2" color="rgba(245,158,11,0.3)" :delay="1200" />
  <p class="t-body mt-lg">Body text.</p>
</div>
```

### Mega Stat

```html
<div class="layout-center">
  <span class="tag">Context Label</span>
  <span class="t-stat-mega t--gradient">97%</span>
  <p class="t-body-sm mt-lg">What this number means.</p>
</div>
```

### Bold Split Stat

```html
<div class="layout-split-stat">
  <div>
    <span class="t-stat-large t--gradient">$4.2T</span>
    <span class="stat-label">Left Label</span>
  </div>
  <div class="divider-v"></div>
  <div>
    <span class="t-stat-large t--gradient-v">0.4%</span>
    <span class="stat-label">Right Label</span>
  </div>
  <p class="split-context t-body-sm t--muted">Context line.</p>
</div>
```

### Four-Panel Grid

```html
<div class="layout-grid-4">
  <div class="card">
    <div class="card-number">01</div>
    <div>
      <span class="t-label mb-md">Category</span>
      <h3 class="t-panel-title mb-sm">Title</h3>
      <p class="t-body-desc">Description.</p>
    </div>
  </div>
  <!-- repeat for 02, 03, 04 -->
  <!-- use card--active on one for emphasis -->
</div>
```

### 3D Overlay

```html
<FloatingGeometry />
<div class="layout-overlay layout-overlay--bottom-left">
  <span class="tag t--shadow">Section Label</span>
  <TextReveal text="Statement" class="t-title t--shadow" />
  <p class="t-body-xs t--shadow mt-lg">Supporting text.</p>
</div>
```

### Video Overlay

```html
<div class="video-slide">
  <video src="/video.mp4" autoplay muted loop playsinline />
  <div class="scrim"></div>
  <div class="layout-overlay layout-overlay--bottom-left">
    <h2 class="t-title t--shadow">Heading</h2>
    <p class="t-body t--shadow mt-lg">Body text.</p>
  </div>
</div>
```

### Browser Frame

```html
<div class="browser-frame-slide">
  <BrowserFrame url="https://example.com" title="Site Name">
    <iframe
      src="https://example.com"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      loading="lazy"
      tabindex="-1"
    ></iframe>
  </BrowserFrame>
</div>
```

### Custom Grid Layout

```html
<div class="slide-grid grid--center">
  <div class="col-7">
    <h2 class="t-heading">Primary content</h2>
    <p class="t-body mt-md">Description text.</p>
  </div>
  <div class="col-5">
    <img src="/chart.png" style="width: 100%;" />
  </div>
</div>
```

### Theme Demo (Dark/Light Split)

```html
<div class="theme-demo">
  <div class="theme-half dark-half">
    <span class="t-tag">Dark Mode</span>
    <h2 class="t-heading mt-md" style="color: #f0ece4;">Heading</h2>
  </div>
  <div class="theme-half light-half">
    <span class="t-tag">Light Mode</span>
    <h2 class="t-heading mt-md" style="color: #0a0a0f;">Heading</h2>
  </div>
</div>
```

---

## 9. Component Props Reference

### CrossMarkers

```html
<CrossMarkers :positions="[
  { top: '100px', left: '120px' },
  { bottom: '100px', right: '140px' },
]" color="rgba(245,158,11,0.15)" :size="28" :delay="500" />
```

`size` accepts a number (auto-scales via `--cs`) or a string (pass-through). Position values are raw px for the 1920px canvas.

### DrawLine

```html
<DrawLine :width="320" :height="2" color="rgba(245,158,11,0.3)" :delay="1200" :duration="900" />
```

`width` and `height` accept numbers (auto-scaled via `--cs`) or strings like `"100%"`, `"45%"` (pass-through). Use inside `.line-wrapper` to constrain width. Props: `direction` ("left"/"right"/"center"), `vertical` (boolean).

### TextReveal

```html
<TextReveal text="The text to reveal" class="t-title" :stagger="60" :duration="700" :delay="300" />
```

Typography applied via `class` prop.

### RollingText

```html
<RollingText text="The Wrong" color="var(--color-accent)" />
```

### SvgPathDraw

```html
<SvgPathDraw :delay="200" :duration="2500" color="rgba(245,158,11,0.12)" />
```

Replays on re-entry via IntersectionObserver.

---

## 10. Animation

### Easing Curves

| Variable | Use |
|----------|-----|
| `--ease-primary` | Default reveals, v-click |
| `--ease-smooth` | SVG path draw |
| `--ease-snappy` | Quick micro-interactions |
| `--ease-elastic` | Overshoot/bounce |
| `--ease-gentle` | Slow ambient motion |

### Animation Sequencing

Stagger delays within a slide:
- Background elements: 0-300ms
- Primary text: 300-600ms
- Supporting elements: 800-1400ms
- Final details: 1400-2000ms

Total under 3 seconds.

### Replay Behavior

`DrawLine` and `SvgPathDraw` replay when navigating away and back (IntersectionObserver resets state). 3D components run continuously.

---

## 11. Viewport & Scaling

- **Canvas:** 1920 x 1080 px (`canvasWidth: 1920`)
- **Scale:** `--cs: 1.959` (1920/980)
- All token classes use `calc(Xrem * var(--cs))` internally
- Authors don't need to think about scaling when using tokens
- For inline styles, use CSS variables: `var(--space-lg)`, not raw px

### What Scales vs. What Doesn't

| Scales (via `--cs`) | Does NOT scale |
|---------------------|----------------|
| font-size, padding, margin, gap | line-height, letter-spacing |
| width/height (rem-based) | border-width, border-radius |
| component dimensions | box-shadow, opacity |

---

## 12. Slidev Notes

- **Transitions:** Always `transition: fade`.
- **v-click** uses `--ease-primary` for reveal animation.
- **UnoCSS utilities** (`mt-8`, `!text-7xl`) do NOT scale with `--cs`. Use our tokens instead.
- **All components mount at startup** while hidden. Three.js/SVG components use IntersectionObserver to delay initialization.
- **Frontmatter `class: text-center`** is global. Layout tokens override where needed.

---

## 13. Gotchas & Anti-Patterns

### v-click Nesting Depth (CRITICAL)

Slidev's markdown parser **breaks** when `v-click` is used inside deeply nested HTML containers. Siblings after the v-click render as raw code/text instead of HTML.

**Broken:**
```html
<div class="layout-left">
  <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
    <div v-click>First item</div>      <!-- works -->
    <div v-click>Second item</div>     <!-- renders as raw text! -->
    <DrawLine width="100%" />           <!-- renders as raw text! -->
  </div>
</div>
```

**Fixed — flatten to root level:**
```html
<div class="layout-left">

<div v-click>First item</div>

<div v-click>Second item</div>

<DrawLine width="100%" />

</div>
```

**Rules:**
1. Keep v-click elements at **one level deep** inside the layout container
2. Do NOT wrap v-click elements inside additional `<div>` containers
3. Leave **blank lines** between root-level HTML elements (helps the parser)
4. If you need staggered reveals without v-click, use component `delay` props instead

### Don't Use UnoCSS Utilities

UnoCSS classes like `mt-8`, `!text-7xl`, `w-full` do **not** scale with `--cs`. Always use our token classes (`.mt-lg`, `.t-title`, etc.) or CSS variables (`var(--space-lg)`).

### Inline Styles — When to Use

Prefer token classes. Use inline styles only for:
- **One-off widths:** `style="max-width: calc(36rem * var(--cs));"`
- **Flex/grid containers:** `style="display: flex; align-items: baseline; gap: var(--space-xl);"`
- **Opacity on decorative elements:** `style="opacity: 0.12;"`
- **Absolute positioning:** `style="position: absolute; left: 72px; top: 200px;"`

Always use `var(--space-*)` in inline styles, never raw pixel/rem values for spacing.

### Ghost/Watermark Numbers

For decorative oversized numbers in the background:
```html
<span class="t-stat-mega t--gradient" style="opacity: 0.12; font-size: calc(28rem * var(--cs)); line-height: 0.8;">1</span>
```

Key: very low opacity (0.08–0.15), `t--gradient` for color, oversized `font-size` via calc.

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Raw `px` in inline styles | Use `calc(Xrem * var(--cs))` or `var(--space-*)` |
| `style="margin-top: 2rem;"` | Use `.mt-xl` class instead |
| `style="text-align: center;"` | Use `.text-center` class instead |
| Wrapping v-click in nested divs | Flatten to root level of layout container |
| Forgetting `.t--shadow` on 3D overlays | Always add to every text element over visuals |
| Adding new CSS to index.css for one slide | Compose from existing tokens |

---

## 14. Checklist for Every New Slide

- [ ] Content positioned using layout tokens, `.slide-grid` + `.col-*`, or overlay system
- [ ] Typography chosen based on content and style intent (not container size)
- [ ] Spacing uses token classes (`.mt-lg`) or CSS variables (`var(--space-xl)`)
- [ ] No raw pixel values in inline styles — use tokens
- [ ] No per-slide CSS added to index.css
- [ ] For 3D/video: layered as background + `.scrim` + `.layout-overlay`
- [ ] For iframes: wrapped in `<BrowserFrame>` inside `.browser-frame-slide`
- [ ] `transition: fade` in frontmatter
- [ ] `.t--shadow` on all text over visual backgrounds
- [ ] Text fits without overflow at 1920x1080
