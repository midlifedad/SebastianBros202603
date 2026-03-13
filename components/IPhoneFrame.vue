<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: { type: String, default: '' },
  width: { type: String, default: '' },
  height: { type: String, default: '' },
  zoom: { type: Number, default: 0.45 },
  time: { type: String, default: '9:41' },
  carrier: { type: String, default: '' },
  darkDevice: { type: Boolean, default: true },
})

const iframeZoomStyle = computed(() => ({
  zoom: props.zoom,
  width: `${(1 / props.zoom) * 100}%`,
  height: `${(1 / props.zoom) * 100}%`,
  border: 'none',
  position: 'absolute',
  top: '0',
  left: '0',
}))

const frameStyle = computed(() => {
  const s = {}
  if (props.width) s.width = props.width
  if (props.height) s.height = props.height
  return s
})
</script>

<template>
  <div class="iphone-frame" :class="{ 'iphone-frame--light': !darkDevice }" :style="frameStyle">
    <!-- Device chrome: top bezel with Dynamic Island -->
    <div class="iphone-bezel-top">
      <div class="iphone-status-bar">
        <span class="iphone-time">{{ time }}</span>
        <div class="iphone-dynamic-island"></div>
        <div class="iphone-status-icons">
          <!-- Signal bars -->
          <svg class="iphone-icon" viewBox="0 0 18 12" fill="currentColor">
            <rect x="0" y="9" width="3" height="3" rx="0.5" opacity="1"/>
            <rect x="4" y="6" width="3" height="6" rx="0.5" opacity="1"/>
            <rect x="8" y="3" width="3" height="9" rx="0.5" opacity="1"/>
            <rect x="12" y="0" width="3" height="12" rx="0.5" opacity="1"/>
          </svg>
          <!-- WiFi -->
          <svg class="iphone-icon" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path d="M1 4.5a10 10 0 0114 0"/>
            <path d="M4 7.5a6 6 0 018 0"/>
            <circle cx="8" cy="10.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
          <!-- Battery -->
          <svg class="iphone-icon iphone-icon--battery" viewBox="0 0 28 13" fill="currentColor">
            <rect x="0" y="0" width="24" height="12" rx="2.5" stroke="currentColor" stroke-width="1" fill="none"/>
            <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" opacity="0.9"/>
            <path d="M25 4v4a2 2 0 000-4z" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Screen content -->
    <div class="iphone-screen">
      <div class="iphone-iframe-zoom" :style="iframeZoomStyle">
        <slot>
          <iframe
            v-if="url"
            :src="url"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            loading="lazy"
          ></iframe>
        </slot>
      </div>
    </div>

    <!-- Bottom bezel with home indicator -->
    <div class="iphone-bezel-bottom">
      <div class="iphone-home-indicator"></div>
    </div>
  </div>
</template>

<style scoped>
.iphone-frame {
  --ip-bg: #1a1a1a;
  --ip-bezel: #111;
  --ip-border: rgba(255, 255, 255, 0.1);
  --ip-text: rgba(255, 255, 255, 0.9);
  --ip-radius: calc(2.8rem * var(--cs, 1));
  --ip-inner-radius: calc(2.2rem * var(--cs, 1));
  --ip-bezel-top-h: calc(3.2rem * var(--cs, 1));
  --ip-bezel-bottom-h: calc(1.6rem * var(--cs, 1));
  --ip-font: calc(0.55rem * var(--cs, 1));
  --ip-island-w: calc(5rem * var(--cs, 1));
  --ip-island-h: calc(1.2rem * var(--cs, 1));
  --ip-side-pad: calc(0.3rem * var(--cs, 1));
  --ip-home-w: calc(5.5rem * var(--cs, 1));
  --ip-home-h: calc(0.2rem * var(--cs, 1));

  display: flex;
  flex-direction: column;
  border-radius: var(--ip-radius);
  background: var(--ip-bg);
  border: calc(0.15rem * var(--cs, 1)) solid var(--ip-border);
  overflow: hidden;
  box-shadow:
    0 calc(1rem * var(--cs, 1)) calc(3rem * var(--cs, 1)) rgba(0, 0, 0, 0.5),
    inset 0 0 0 calc(0.05rem * var(--cs, 1)) rgba(255, 255, 255, 0.05);
  width: calc(17rem * var(--cs, 1));
  aspect-ratio: 9 / 19.5;
}

.iphone-frame--light {
  --ip-bg: #f5f5f7;
  --ip-bezel: #e8e8ea;
  --ip-border: rgba(0, 0, 0, 0.15);
  --ip-text: rgba(0, 0, 0, 0.9);
}

/* --- Top bezel with status bar --- */
.iphone-bezel-top {
  height: var(--ip-bezel-top-h);
  min-height: var(--ip-bezel-top-h);
  background: var(--ip-bezel);
  display: flex;
  align-items: flex-end;
  padding: 0 calc(1.2rem * var(--cs, 1)) calc(0.3rem * var(--cs, 1));
  flex-shrink: 0;
}

.iphone-status-bar {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.iphone-time {
  font-family: var(--font-body, 'Plus Jakarta Sans', -apple-system, sans-serif);
  font-size: var(--ip-font);
  font-weight: 600;
  color: var(--ip-text);
  flex: 1;
  letter-spacing: 0.02em;
}

.iphone-dynamic-island {
  width: var(--ip-island-w);
  height: var(--ip-island-h);
  background: #000;
  border-radius: calc(0.7rem * var(--cs, 1));
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.iphone-frame--light .iphone-dynamic-island {
  background: #1a1a1a;
}

.iphone-status-icons {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: calc(0.25rem * var(--cs, 1));
}

.iphone-icon {
  width: calc(0.7rem * var(--cs, 1));
  height: calc(0.5rem * var(--cs, 1));
  color: var(--ip-text);
}

.iphone-icon--battery {
  width: calc(1rem * var(--cs, 1));
  height: calc(0.5rem * var(--cs, 1));
}

/* --- Screen content --- */
.iphone-screen {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #000;
}

.iphone-iframe-zoom {
  transform-origin: top left;
}

.iphone-iframe-zoom :deep(iframe) {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  display: block;
  pointer-events: auto;
}

/* --- Bottom bezel with home indicator --- */
.iphone-bezel-bottom {
  height: var(--ip-bezel-bottom-h);
  min-height: var(--ip-bezel-bottom-h);
  background: var(--ip-bezel);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.iphone-home-indicator {
  width: var(--ip-home-w);
  height: var(--ip-home-h);
  background: var(--ip-text);
  border-radius: calc(0.1rem * var(--cs, 1));
  opacity: 0.3;
}
</style>
