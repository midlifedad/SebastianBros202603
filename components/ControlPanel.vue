<script setup>
import { ref, watch, onMounted } from 'vue'

const transition = ref('fade')
const transitionOptions = ['fade', 'slide-left', 'slide-right', 'slide-up', 'slide-down', 'none']

const slideNumberDuration = ref(2)
const labelDuration = ref(2)
const showSlideNumbers = ref(true)
const showIframeLabels = ref(true)
const slideNumberPosition = ref('left')

const accentColor = ref('#f59e0b')
const bgColor = ref('#0a0a0f')
const textColor = ref('#f0ece4')

const headingSize = ref(100)
const bodySize = ref(100)
const quoteSize = ref(100)

const darkControls = ref(true)

function applySettings() {
  const root = document.documentElement

  // Colors
  root.style.setProperty('--color-accent', accentColor.value)
  root.style.setProperty('--color-bg', bgColor.value)
  root.style.setProperty('--color-text', textColor.value)

  // Update gradient
  root.style.setProperty('--color-gradient-start', accentColor.value)

  // Font scaling
  root.style.setProperty('--heading-scale', headingSize.value / 100)
  root.style.setProperty('--body-scale', bodySize.value / 100)
  root.style.setProperty('--quote-scale', quoteSize.value / 100)

  // Slide number duration & position
  root.style.setProperty('--slide-number-duration', slideNumberDuration.value + 's')
  root.style.setProperty('--slide-number-display', showSlideNumbers.value ? 'block' : 'none')
  if (slideNumberPosition.value === 'left') {
    root.style.setProperty('--slide-number-left', 'calc(0.75rem * var(--cs, 1))')
    root.style.setProperty('--slide-number-right', 'auto')
  } else {
    root.style.setProperty('--slide-number-left', 'auto')
    root.style.setProperty('--slide-number-right', 'calc(0.75rem * var(--cs, 1))')
  }

  // Label duration & visibility
  root.style.setProperty('--label-duration', labelDuration.value + 's')
  root.style.setProperty('--label-display', showIframeLabels.value ? 'block' : 'none')

  // Dark mode for Slidev controls
  if (darkControls.value) {
    root.classList.remove('light')
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
    root.classList.add('light')
  }
}

function resetDefaults() {
  transition.value = 'fade'
  slideNumberDuration.value = 2
  labelDuration.value = 2
  showSlideNumbers.value = true
  showIframeLabels.value = true
  slideNumberPosition.value = 'left'
  accentColor.value = '#f59e0b'
  bgColor.value = '#0a0a0f'
  textColor.value = '#f0ece4'
  headingSize.value = 100
  bodySize.value = 100
  quoteSize.value = 100
  darkControls.value = true
  applySettings()
}

// Auto-apply on any change
watch([transition, slideNumberDuration, labelDuration, showSlideNumbers, showIframeLabels,
       slideNumberPosition, accentColor, bgColor, textColor, headingSize, bodySize, quoteSize,
       darkControls],
       applySettings, { deep: true })

onMounted(applySettings)
</script>

<template>
  <div class="panel">
    <h2 class="panel-title">Presentation Settings</h2>

    <div class="panel-grid">
      <!-- Column 1: Display -->
      <div class="panel-section">
        <h3 class="section-label">Display</h3>

        <label class="field">
          <span>Dark controls</span>
          <div class="field-row">
            <input type="checkbox" v-model="darkControls" />
            <span class="field-hint">{{ darkControls ? 'Dark' : 'Light' }}</span>
          </div>
        </label>

        <label class="field">
          <span>Slide numbers</span>
          <div class="field-row">
            <input type="checkbox" v-model="showSlideNumbers" />
            <span class="field-hint">{{ showSlideNumbers ? 'On' : 'Off' }}</span>
          </div>
        </label>

        <label class="field" v-if="showSlideNumbers">
          <span>Number fade (sec)</span>
          <input type="range" min="1" max="8" step="0.5" v-model.number="slideNumberDuration" />
          <span class="field-value">{{ slideNumberDuration }}s</span>
        </label>

        <label class="field" v-if="showSlideNumbers">
          <span>Number position</span>
          <div class="field-row">
            <button
              class="toggle-btn"
              :class="{ active: slideNumberPosition === 'left' }"
              @click="slideNumberPosition = 'left'"
            >Left</button>
            <button
              class="toggle-btn"
              :class="{ active: slideNumberPosition === 'right' }"
              @click="slideNumberPosition = 'right'"
            >Right</button>
          </div>
        </label>

        <label class="field">
          <span>Iframe labels</span>
          <div class="field-row">
            <input type="checkbox" v-model="showIframeLabels" />
            <span class="field-hint">{{ showIframeLabels ? 'On' : 'Off' }}</span>
          </div>
        </label>

        <label class="field" v-if="showIframeLabels">
          <span>Label fade (sec)</span>
          <input type="range" min="1" max="8" step="0.5" v-model.number="labelDuration" />
          <span class="field-value">{{ labelDuration }}s</span>
        </label>
      </div>

      <!-- Column 2: Colors -->
      <div class="panel-section">
        <h3 class="section-label">Colors</h3>

        <label class="field">
          <span>Accent</span>
          <div class="field-row">
            <input type="color" v-model="accentColor" />
            <span class="field-value">{{ accentColor }}</span>
          </div>
        </label>

        <label class="field">
          <span>Background</span>
          <div class="field-row">
            <input type="color" v-model="bgColor" />
            <span class="field-value">{{ bgColor }}</span>
          </div>
        </label>

        <label class="field">
          <span>Text</span>
          <div class="field-row">
            <input type="color" v-model="textColor" />
            <span class="field-value">{{ textColor }}</span>
          </div>
        </label>
      </div>

      <!-- Column 3: Typography -->
      <div class="panel-section">
        <h3 class="section-label">Typography</h3>

        <label class="field">
          <span>Heading size</span>
          <input type="range" min="60" max="140" step="5" v-model.number="headingSize" />
          <span class="field-value">{{ headingSize }}%</span>
        </label>

        <label class="field">
          <span>Body size</span>
          <input type="range" min="60" max="140" step="5" v-model.number="bodySize" />
          <span class="field-value">{{ bodySize }}%</span>
        </label>

        <label class="field">
          <span>Quote size</span>
          <input type="range" min="60" max="140" step="5" v-model.number="quoteSize" />
          <span class="field-value">{{ quoteSize }}%</span>
        </label>
      </div>
    </div>

    <button class="reset-btn" @click="resetDefaults">Reset All to Defaults</button>
  </div>
</template>

<style scoped>
.panel {
  --p: var(--cs, 1);
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(16px * var(--p));
  font-size: calc(14px * var(--p));
}

.panel-title {
  font-family: 'Playfair Display', serif !important;
  font-size: calc(1.6rem * var(--p)) !important;
  color: var(--color-text) !important;
  margin-bottom: calc(8px * var(--p));
}

.panel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: calc(24px * var(--p));
  flex: 1;
}

.panel-section {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: calc(12px * var(--p));
  padding: calc(16px * var(--p));
}

.section-label {
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif) !important;
  font-size: calc(0.7rem * var(--p)) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: var(--color-accent) !important;
  margin-bottom: calc(12px * var(--p)) !important;
}

.field {
  display: flex;
  flex-direction: column;
  gap: calc(4px * var(--p));
  margin-bottom: calc(12px * var(--p));
  cursor: pointer;
}

.field > span:first-child {
  font-size: calc(0.7rem * var(--p)) !important;
  color: var(--color-text-muted) !important;
}

.field-row {
  display: flex;
  align-items: center;
  gap: calc(8px * var(--p));
}

.field-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: calc(0.6rem * var(--p)) !important;
  color: var(--color-text-dim) !important;
}

.field-hint {
  font-size: calc(0.6rem * var(--p)) !important;
  color: var(--color-text-dim) !important;
}

input[type="range"] {
  width: 100%;
  height: calc(4px * var(--p));
  -webkit-appearance: none;
  appearance: none;
  background: var(--color-surface);
  border-radius: calc(2px * var(--p));
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: calc(14px * var(--p));
  height: calc(14px * var(--p));
  border-radius: 50%;
  background: var(--color-accent);
  cursor: pointer;
}

input[type="color"] {
  width: calc(28px * var(--p));
  height: calc(28px * var(--p));
  border: 1px solid var(--color-border);
  border-radius: calc(6px * var(--p));
  background: none;
  cursor: pointer;
  padding: 0;
}

input[type="checkbox"] {
  width: calc(14px * var(--p));
  height: calc(14px * var(--p));
  accent-color: var(--color-accent);
  cursor: pointer;
}

.toggle-btn {
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
  font-size: calc(0.6rem * var(--p));
  padding: calc(3px * var(--p)) calc(10px * var(--p));
  border: 1px solid var(--color-border);
  border-radius: calc(4px * var(--p));
  background: var(--color-surface);
  color: var(--color-text-dim);
  cursor: pointer;
  transition: all 0.15s;
}

.toggle-btn.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(245, 158, 11, 0.08);
}

.reset-btn {
  align-self: flex-end;
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
  font-size: calc(0.65rem * var(--p));
  padding: calc(6px * var(--p)) calc(16px * var(--p));
  border: 1px solid var(--color-border);
  border-radius: calc(6px * var(--p));
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}
</style>
