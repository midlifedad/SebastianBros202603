<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: { type: String, default: '' },
  title: { type: String, default: '' },
  darkChrome: { type: Boolean, default: true },
  width: { type: String, default: '100%' },
  height: { type: String, default: '100%' },
  zoom: { type: Number, default: 0.5 },
  align: { type: String, default: 'center' },
  top: { type: String, default: '0' }
})

const displayUrl = computed(() => {
  if (!props.url) return ''
  try {
    const u = new URL(props.url)
    return u.hostname + (u.pathname !== '/' ? u.pathname : '')
  } catch {
    return props.url
  }
})

const iframeZoomStyle = computed(() => ({
  zoom: props.zoom,
  width: `${(1 / props.zoom) * 100}%`,
  height: `${(1 / props.zoom) * 100}%`,
  border: 'none',
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: `translateX(-50%)`
}))

const frameStyle = computed(() => ({
  width: props.width,
  height: props.height,
  alignSelf: props.align === 'left' ? 'flex-start' : props.align === 'right' ? 'flex-end' : 'center',
  marginTop: props.top
}))
</script>

<template>
  <div class="browser-frame" :class="{ 'browser-frame--light': !darkChrome }" :style="frameStyle">
    <!-- Title bar -->
    <div class="browser-titlebar">
      <div class="browser-dots">
        <span class="dot dot--close"></span>
        <span class="dot dot--minimize"></span>
        <span class="dot dot--maximize"></span>
      </div>
      <div class="browser-address">
        <svg class="browser-lock" viewBox="0 0 16 16" fill="none">
          <path d="M4.5 7V5a3.5 3.5 0 117 0v2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
        </svg>
        <span class="browser-url">{{ displayUrl }}</span>
      </div>
      <div class="browser-actions">
        <svg class="browser-icon" viewBox="0 0 16 16" fill="none">
          <path d="M4 8h8M8 4v8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <!-- Content area -->
    <div class="browser-content">
      <div class="browser-iframe-zoom" :style="iframeZoomStyle">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.browser-frame {
  --bf-bg: rgba(30, 30, 35, 0.95);
  --bf-border: rgba(255, 255, 255, 0.08);
  --bf-text: rgba(255, 255, 255, 0.5);
  --bf-bar: rgba(255, 255, 255, 0.06);
  --bf-radius: calc(0.6rem * var(--cs, 1));
  --bf-titlebar-h: calc(2.2rem * var(--cs, 1));
  --bf-dot-size: calc(0.45rem * var(--cs, 1));
  --bf-font: calc(0.55rem * var(--cs, 1));

  display: flex;
  flex-direction: column;
  border-radius: var(--bf-radius);
  border: 1px solid var(--bf-border);
  overflow: hidden;
  background: var(--bf-bg);
  box-shadow:
    0 calc(0.5rem * var(--cs, 1)) calc(2rem * var(--cs, 1)) rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.03);
}

.browser-frame--light {
  --bf-bg: rgba(245, 245, 247, 0.97);
  --bf-border: rgba(0, 0, 0, 0.12);
  --bf-text: rgba(0, 0, 0, 0.45);
  --bf-bar: rgba(0, 0, 0, 0.05);
}

/* --- Title bar --- */
.browser-titlebar {
  display: flex;
  align-items: center;
  height: var(--bf-titlebar-h);
  min-height: var(--bf-titlebar-h);
  padding: 0 calc(0.7rem * var(--cs, 1));
  background: var(--bf-bg);
  border-bottom: 1px solid var(--bf-border);
  gap: calc(0.5rem * var(--cs, 1));
  flex-shrink: 0;
}

/* --- Traffic light dots --- */
.browser-dots {
  display: flex;
  gap: calc(0.3rem * var(--cs, 1));
  flex-shrink: 0;
}

.dot {
  width: var(--bf-dot-size);
  height: var(--bf-dot-size);
  border-radius: 50%;
}

.dot--close { background: #ff5f57; }
.dot--minimize { background: #febc2e; }
.dot--maximize { background: #28c840; }

/* --- Address bar --- */
.browser-address {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(0.25rem * var(--cs, 1));
  background: var(--bf-bar);
  border-radius: calc(0.25rem * var(--cs, 1));
  padding: calc(0.2rem * var(--cs, 1)) calc(0.5rem * var(--cs, 1));
  min-width: 0;
}

.browser-lock {
  width: calc(0.6rem * var(--cs, 1));
  height: calc(0.6rem * var(--cs, 1));
  color: var(--bf-text);
  flex-shrink: 0;
}

.browser-url {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: var(--bf-font);
  color: var(--bf-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* --- Right actions --- */
.browser-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.browser-icon {
  width: calc(0.7rem * var(--cs, 1));
  height: calc(0.7rem * var(--cs, 1));
  color: var(--bf-text);
  opacity: 0.5;
}

/* --- Content area --- */
.browser-content {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #000;
}

/* --- Iframe zoom wrapper --- */
.browser-iframe-zoom {
  transform-origin: center center;
}
.browser-iframe-zoom :deep(iframe) {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  display: block;
  pointer-events: auto;
  position: relative;
  z-index: 5;
}
</style>
