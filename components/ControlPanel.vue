<script setup>
import { ref, watch, onMounted } from 'vue'

const transition = ref('fade')
const transitionOptions = ['fade', 'slide-left', 'slide-right', 'slide-up', 'slide-down', 'none']

const slideNumberDuration = ref(2)
const labelDuration = ref(2)
const showSlideNumbers = ref(true)
const showIframeLabels = ref(true)

const accentColor = ref('#f59e0b')
const bgColor = ref('#0a0a0f')
const textColor = ref('#f0ece4')

const headingSize = ref(100)
const bodySize = ref(100)
const quoteSize = ref(100)

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

  // Slide number duration
  root.style.setProperty('--slide-number-duration', slideNumberDuration.value + 's')
  root.style.setProperty('--slide-number-display', showSlideNumbers.value ? 'block' : 'none')

  // Label duration & visibility
  root.style.setProperty('--label-duration', labelDuration.value + 's')
  root.style.setProperty('--label-display', showIframeLabels.value ? 'block' : 'none')
}

function resetDefaults() {
  transition.value = 'fade'
  slideNumberDuration.value = 2
  labelDuration.value = 2
  showSlideNumbers.value = true
  showIframeLabels.value = true
  accentColor.value = '#f59e0b'
  bgColor.value = '#0a0a0f'
  textColor.value = '#f0ece4'
  headingSize.value = 100
  bodySize.value = 100
  quoteSize.value = 100
  applySettings()
}

// Auto-apply on any change
watch([transition, slideNumberDuration, labelDuration, showSlideNumbers, showIframeLabels,
       accentColor, bgColor, textColor, headingSize, bodySize, quoteSize], applySettings, { deep: true })

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
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-title {
  font-family: 'Playfair Display', serif !important;
  font-size: 1.6rem !important;
  color: var(--color-text) !important;
  margin-bottom: 8px;
}

.panel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  flex: 1;
}

.panel-section {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
}

.section-label {
  font-family: 'Inter', sans-serif !important;
  font-size: 0.7rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  color: var(--color-accent) !important;
  margin-bottom: 12px !important;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  cursor: pointer;
}

.field > span:first-child {
  font-size: 0.7rem !important;
  color: var(--color-text-muted) !important;
}

.field-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem !important;
  color: var(--color-text-dim) !important;
}

.field-hint {
  font-size: 0.6rem !important;
  color: var(--color-text-dim) !important;
}

input[type="range"] {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--color-surface);
  border-radius: 2px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  cursor: pointer;
}

input[type="color"] {
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: none;
  cursor: pointer;
  padding: 0;
}

input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.reset-btn {
  align-self: flex-end;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
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
