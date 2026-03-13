<script setup>
import { onMounted, onUnmounted } from 'vue'
import { openDemoWindow, focusDemoWindow, focusPresentation } from '../composables/useDemoWindows'

const props = defineProps({
  url: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, default: '' },
  windowWidth: { type: Number, default: 1280 },
  windowHeight: { type: Number, default: 800 },
})

onMounted(() => {
  openDemoWindow(props.url, props.name, {
    width: props.windowWidth,
    height: props.windowHeight,
  })
  setTimeout(() => focusDemoWindow(props.name), 200)
})

onUnmounted(() => {
  setTimeout(() => focusPresentation(), 100)
})
</script>

<template>
  <div class="browser-frame-slide">
    <BrowserFrame :url="url" :title="title || name" width="66%" height="120%" :zoom="0.75" top="5%">
      <div class="demo-active-overlay">
        <div class="demo-active-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
        <div class="demo-active-text">Live Demo</div>
        <div class="demo-active-hint">→ to continue</div>
      </div>
    </BrowserFrame>
  </div>
</template>

<style scoped>
.demo-active-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  gap: calc(1rem * var(--cs, 1));
}

.demo-active-icon {
  opacity: 0.2;
}

.demo-active-icon svg {
  width: calc(4rem * var(--cs, 1));
  height: calc(4rem * var(--cs, 1));
}

.demo-active-text {
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
  font-size: calc(1.2rem * var(--cs, 1));
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.5;
}

.demo-active-hint {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: calc(0.6rem * var(--cs, 1));
  opacity: 0.25;
}
</style>
