# Slide Design System

**Platform:** Slidev (Vite + Vue 3 + UnoCSS)
**Canvas:** 1920 x 1080 px (Full HD, 16:9)
**Date:** 2026-03-08

---

## What This Is

A design system for building cinematic slide presentations using HTML/CSS/Vue. Each slide is a web page — it can contain anything a web page can. The system provides:

- A **12-column grid** for consistent layout
- A **typography palette** for text styling
- **Reusable components** (interactive, 3D, decorative, UI chrome)
- **Spacing and color tokens** for consistency
- **Example templates** as starting points (not a closed set)

The goal: an author (human or AI agent) composes slides from these building blocks without writing per-slide CSS. The possible slide layouts are infinite — the system provides the vocabulary, not the sentences.

---

## 1. Grid System

### Purpose

The grid is a **layout reference** — a consistent way to position any content on the slide. Text, images, 3D scenes, video, cards, charts, whitespace — anything.

It does NOT determine font sizes or constrain creative choices. It's scaffolding.

### Grid Math

| Property | Value |
|----------|-------|
| Canvas | 1920 x 1080px |
| Outer padding | 160px each side |
| Content area | 1600px wide |
| Columns | 12 (using CSS `fr` units) |
| Gutter | 24px |

### Column Spans

| Span | Width | Example Uses |
|------|-------|-------------|
| 12 | 1600px | Full-width anything |
| 10 | 1330px | Wide content with breathing room |
| 8 | 1054px | Primary content alongside a sidebar |
| 6 | 788px | Two equal columns |
| 4 | 519px | Three-column layout |
| 3 | 385px | Four-column card grid |

Asymmetric combinations work too: 7+5, 9+3, 5+4+3, etc.

### CSS Implementation

```css
.slide-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: var(--pad-standard);
  box-sizing: border-box;
}

.col-1  { grid-column: span 1; }
.col-2  { grid-column: span 2; }
/* ... */
.col-12 { grid-column: span 12; }
```

### Layout Convenience Tokens

For common patterns, convenience classes that set up the grid internally:

| Token | What It Does |
|-------|-------------|
| `.layout-center` | Centers content vertically and horizontally |
| `.layout-left` | Left-aligned, vertically centered |
| `.layout-split` | Two equal columns |
| `.layout-bleed` | Full 1920x1080, no padding |
| `.layout-overlay` | Absolute-positioned text layer over backgrounds |

These are shortcuts — an author can always use `.slide-grid` + `.col-*` directly for custom arrangements.

### The Grid Is Not Prescriptive

The 12-column grid is a reference, not a cage. Authors can:
- Use any combination of column spans
- Nest grids within grid cells
- Mix grid layout with flex layout
- Ignore the grid entirely for full-bleed or overlay slides
- Create layouts that don't map to any template

---

## 2. Typography

### Purpose

Typography tokens are a **creative palette**. The author chooses sizes and styles based on:
- What the text is saying (a punchy statement vs. supporting context)
- The feeling they want (commanding, reflective, understated, dramatic)
- What fits well in the space they've chosen

The grid does NOT auto-set font sizes. Typography is an independent creative decision.

### Font Families

| Variable | Family | Character |
|----------|--------|-----------|
| `--font-editorial` | Cormorant Garamond | Elegant, editorial serif |
| `--font-display` | Playfair Display | Bold, high-contrast serif |
| `--font-body` | Plus Jakarta Sans | Clean, modern sans-serif |
| `--font-mono` | JetBrains Mono | Technical, labels |

### Heading Scale (Editorial Serif)

These are the available sizes. Pick based on content and intent, not container.

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

### Body Scale (Sans-Serif)

| Token | Size | Color | Feel |
|-------|------|-------|------|
| `.t-body` | 1.3rem (~41px) | muted | Primary readable text |
| `.t-body-sm` | 1.1rem (~34px) | muted | Secondary, descriptions |
| `.t-body-xs` | 1rem (~31px) | muted | Small body, overlay text |
| `.t-body-desc` | 0.75rem (~24px) | muted | Card descriptions, fine print |
| `.t-subtitle` | 1.1rem (~34px) | muted | Uppercase subtitle labels |
| `.t-attribution` | 0.85rem (~27px) | dim | Quote credits |

### Label Scale (Monospace)

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
| `.t--gradient-v` | White-to-muted vertical fade |
| `.t--accent` | Accent color |
| `.t--muted` | Muted gray |
| `.t--dim` | Dim gray |
| `.t--shadow` | Heavy text shadow (over 3D/video) |
| `.t--shadow-sm` | Light text shadow |
| `.t--uppercase` | Uppercase + letter-spacing |

### No `max-width` on Typography

Typography tokens do NOT carry `max-width`. The grid column (or layout container) is the width constraint. This eliminates overflow bugs — text flows naturally within its container.

If an author wants to constrain width for aesthetic reasons, they do it on the container, not the text.

### Choosing Typography — Guidance, Not Rules

The right token depends on the **content and intent**, not a formula:

- **"Fear says wait."** (3 words, punchy) → `.t-display` even in a narrow column — it's a statement
- **"The most creative, opportunity-rich moment in human history"** (long, reflective) → `.t-subheading` — needs room to breathe
- **"12 agents, 2 months, 1 person"** (data) → `.t-stat-rolling` — the numbers are the point
- **"Supporting context that explains the headline above"** → `.t-body` — readability, not impact

If text overflows its container, the author should either:
1. Use a smaller token (step down the scale)
2. Use fewer words
3. Widen the container (adjust column span)

---

## 3. Color System

### Semantic Colors

| Variable | Hex | Use |
|----------|-----|-----|
| `--color-bg` | #0a0a0f | Slide background (near-black) |
| `--color-bg-soft` | #12121a | Card/panel backgrounds |
| `--color-bg-card` | #1a1a26 | Elevated surfaces |
| `--color-surface` | #22222e | Input/control backgrounds |
| `--color-text` | #f0ece4 | Primary text (warm cream) |
| `--color-text-muted` | #8a8698 | Secondary text (gray) |
| `--color-text-dim` | #5a5668 | Tertiary text (dim) |
| `--color-accent` | #f59e0b | Primary accent (amber) |
| `--color-border` | rgba(255,255,255,0.06) | Subtle borders |

### Extended Palette

| Variable | Hex | |
|----------|-----|-|
| `--color-red` | #ef4444 | Danger, tension |
| `--color-coral` | #f97066 | Warm secondary |
| `--color-blue` | #1a2ffb | Cool accent |
| `--color-sky` | #38bdf8 | Light cool |
| `--color-teal` | #2dd4bf | Fresh, growth |
| `--color-green` | #c1ff00 | Bright positive |
| `--color-violet` | #8b5cf6 | Creative |
| `--color-rose` | #f43f8e | Bold |
| `--color-peach` | #fb923c | Warm orange |

### Color Rules

- Typography tokens do NOT use `!important` on color — inline `style="color: X"` always works
- Headings default to `--color-text` (cream)
- Body defaults to `--color-text-muted` (gray)
- Tags/labels default to `--color-accent` (amber)
- On light backgrounds, override text colors with inline styles

---

## 4. Spacing

### Scale

| Token | Base | Rendered |
|-------|------|----------|
| `--space-xs` | 0.5rem | ~16px |
| `--space-sm` | 0.75rem | ~24px |
| `--space-md` | 1rem | ~31px |
| `--space-lg` | 1.5rem | ~47px |
| `--space-xl` | 2rem | ~63px |
| `--space-2xl` | 2.5rem | ~78px |
| `--space-3xl` | 3rem | ~94px |
| `--space-4xl` | 4rem | ~125px |

### Utility Classes

- **Margin-top:** `.mt-xs` through `.mt-4xl`
- **Margin-bottom:** `.mb-xs` through `.mb-xl`
- **Gap:** `.gap-sm`, `.gap-md`, `.gap-lg`, `.gap-4xl`

### Padding Presets

| Token | Rendered | Use |
|-------|----------|-----|
| `--pad-standard` | ~157px | Default slide padding |
| `--pad-wide` | ~196px | Extra horizontal room |
| `--pad-generous` | ~235px | Centered content |
| `--pad-compact` | ~118px | Tight (cards, overlays) |

---

## 5. Components

### CSS-Only Components

| Component | What It Is |
|-----------|-----------|
| `.tag` | Mono uppercase accent label (with bottom margin) |
| `.pill` / `.pill-row` | Bordered capsule tags in a row |
| `.hint-pill` | Subtle dim capsule for hints |
| `.accent-line` | Inline horizontal amber line (for attributions) |
| `.stat-block` / `.stat-row` | Number + label pairs |
| `.card` / `.card--active` | Panel with subtle border, optional accent |
| `.card-number` | Oversized ghost number in card corner |
| `.divider-v` | Vertical amber gradient line |
| `.scrim` | Dark gradient overlay for text legibility over video/3D |
| `.deco-lines` | Container for positioned decorative DrawLines |
| `.section-line` | Top accent line on section dividers |

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

All render as full-bleed backgrounds. Use IntersectionObserver for lifecycle.

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
| `<ControlPanel>` | Live settings panel (colors, typography, numbers) | (none) |

---

## 6. Layering Pattern (3D / Video Slides)

Slides with background visuals use a consistent layer stack:

```
1. Background (full-bleed)     ← 3D component, video, or iframe
2. Scrim (optional)            ← .scrim — dark gradient for legibility
3. Text overlay                ← .layout-overlay + position modifier
```

```html
<ParticleCurve />
<div class="scrim"></div>
<div class="layout-overlay layout-overlay--bottom-left">
  <span class="tag t--shadow">Label</span>
  <h2 class="t-title t--shadow">Heading text</h2>
  <p class="t-body-sm t--shadow mt-lg">Supporting text.</p>
</div>
```

Always use `.t--shadow` on text over visual backgrounds.

Overlay positions: `--bottom-left`, `--center`, `--center-right`.

---

## 7. Scaling System

### How `--cs` Works

`--cs: 1.959` (1920 / 980). All token sizes use `calc(Xrem * var(--cs))`.

Authors don't need to think about this when using token classes. Only relevant for inline styles:

```html
<!-- Use variables, not raw px -->
<div style="gap: var(--space-lg); padding: var(--space-xl);">
```

### What Scales vs. What Doesn't

| Scales | Doesn't Scale |
|--------|---------------|
| font-size, padding, margin, gap | line-height, letter-spacing |
| width/height (rem-based) | border-width, border-radius |
| component dimensions | box-shadow, opacity |

---

## 8. Animation

### Easing Curves

| Variable | Use |
|----------|-----|
| `--ease-primary` | Default reveals, v-click |
| `--ease-smooth` | SVG path draw |
| `--ease-snappy` | Quick micro-interactions |
| `--ease-elastic` | Overshoot/bounce |
| `--ease-gentle` | Slow ambient motion |

### Slide Transitions

Always `transition: fade` in frontmatter.

### v-click

Reveals elements on click/space. Hidden state: faded + shifted down. Animates with `--ease-primary`.

### Animation Sequencing

When multiple elements animate on one slide, stagger delays:
- Background elements: 0-300ms
- Primary text: 300-600ms
- Supporting elements: 800-1400ms
- Final details: 1400-2000ms

Total sequence under 3 seconds.

### Replay Behavior

`DrawLine` and `SvgPathDraw` replay when navigating away and back (IntersectionObserver resets state). 3D components run continuously.

---

## 9. Example Templates

These are **starting points**, not a closed set. The possible layouts are infinite.

### Centered Statement
```html
<div class="layout-center">
  <p class="t-display">"The big idea."</p>
  <p class="t-body t--muted mt-xl">Context.</p>
</div>
```

### Editorial Left
```html
<div class="layout-left">
  <span class="tag">Section Label</span>
  <TextReveal text="Heading text" class="t-title" />
  <p class="t-body mt-xl">Body text.</p>
</div>
```

### Two-Column Split
```html
<div class="layout-split">
  <div>
    <h2 class="t-heading">Left heading</h2>
    <p class="t-body-sm mt-md">Left body.</p>
  </div>
  <div>
    <h2 class="t-heading">Right heading</h2>
    <p class="t-body-sm mt-md">Right body.</p>
  </div>
</div>
```

### Stat Comparison
```html
<div class="layout-split-stat">
  <div>
    <span class="t-stat-large t--gradient">$4.2T</span>
    <span class="stat-label">Label</span>
  </div>
  <div class="divider-v"></div>
  <div>
    <span class="t-stat-large t--gradient-v">0.4%</span>
    <span class="stat-label">Label</span>
  </div>
</div>
```

### Card Grid
```html
<div class="layout-grid-4">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card card--active">...</div>
  <div class="card">...</div>
</div>
```

### 3D Overlay
```html
<FloatingGeometry />
<div class="layout-overlay layout-overlay--bottom-left">
  <span class="tag t--shadow">Label</span>
  <TextReveal text="Statement" class="t-title t--shadow" />
</div>
```

### Video Background
```html
<div class="video-slide">
  <video src="/video.mp4" autoplay muted loop playsinline />
  <div class="scrim"></div>
  <div class="layout-overlay layout-overlay--bottom-left">
    <h2 class="t-title t--shadow">Heading</h2>
  </div>
</div>
```

### Browser Frame
```html
<div class="browser-frame-slide">
  <BrowserFrame url="https://example.com" title="Example">
    <iframe src="https://example.com" ... />
  </BrowserFrame>
</div>
```

### Custom Grid Layout
```html
<div class="slide-grid">
  <div class="col-7">
    <!-- primary content -->
  </div>
  <div class="col-5">
    <!-- secondary content -->
  </div>
</div>
```

---

## 10. Authoring Checklist

For every new slide:

- [ ] Content positioned using layout tokens or `.slide-grid` + `.col-*`
- [ ] Typography chosen based on content and style intent
- [ ] Spacing uses utility classes (`.mt-lg`) or CSS variables (`var(--space-xl)`)
- [ ] No raw pixel values in inline styles — use tokens
- [ ] No per-slide CSS added to index.css
- [ ] For visual backgrounds: layered as component + scrim + overlay
- [ ] For iframes: wrapped in `<BrowserFrame>` inside `.browser-frame-slide`
- [ ] `transition: fade` in frontmatter
- [ ] Text fits without overflow at 1920x1080

---

## 11. Implementation Plan

### What Changes

1. **`styles/index.css`** — Add `.slide-grid` + `.col-*` classes. Rename `.type-*` to `.t-*`. Remove `max-width` from all typography tokens. Keep everything else (colors, spacing, components, layout convenience tokens, special slides).

2. **`slides.md`** — Update token class names. Remove inline `max-width` overrides. Add `.slide-grid` usage where it improves layout clarity.

3. **`TEMPLATE_GUIDE.md`** — Rewrite to reflect the simplified system: grid as layout reference, typography as creative palette, example templates as starting points.

### What Stays

- All Vue components (unchanged)
- Color system (unchanged)
- Spacing system (unchanged)
- Layout convenience tokens (`.layout-center`, `.layout-left`, etc.) — kept as shortcuts
- Component tokens (`.tag`, `.pill`, `.card`, etc.) — kept as-is
- Special slide layouts (`.video-slide`, `.browser-frame-slide`, `.theme-demo`)
- `--cs` scaling system
- `global-bottom.vue` and `ControlPanel.vue`

### Execution Order

1. Add grid classes to `index.css`
2. Rename `.type-*` → `.t-*` and remove `max-width` from typography
3. Update `slides.md` class names
4. Rewrite `TEMPLATE_GUIDE.md`
5. Verify all slides at 1920x1080

---

## 12. Token Rename Reference

| Old | New |
|-----|-----|
| `.type-hero` | `.t-display` |
| `.type-hero-lg` | `.t-display-sm` |
| `.type-section` | `.t-title` |
| `.type-content` | `.t-heading` |
| `.type-narrative` | `.t-subheading` |
| `.type-narrative-sm` | `.t-subheading-sm` |
| `.type-quote` | `.t-quote` |
| `.type-body` | `.t-body` |
| `.type-body-sm` | `.t-body-sm` |
| `.type-body-xs` | `.t-body-xs` |
| `.type-body-desc` | `.t-body-desc` |
| `.type-subtitle` | `.t-subtitle` |
| `.type-attribution` | `.t-attribution` |
| `.type-tag` | `.t-tag` |
| `.type-label` | `.t-label` |
| `.type-hint` | `.t-hint` |
| `.type--shadow` | `.t--shadow` |
| `.type--gradient` | `.t--gradient` |
| `.type--accent` | `.t--accent` |
| `.type--muted` | `.t--muted` |
| `.type--dim` | `.t--dim` |
| `.type--wide` | (removed — grid handles width) |
| `.type--narrow` | (removed — grid handles width) |
| `.type--no-max` | (removed — no max-width on any token) |
