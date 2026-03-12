<script setup>
import { ref, watch, onDeactivated } from 'vue'

const props = defineProps({
  runLinear: { type: Boolean, default: false },
  runExp: { type: Boolean, default: false },
  linearDuration: { type: Number, default: 250 },
  expDuration: { type: Number, default: 1500 },
  linearSteps: { type: Number, default: 30 },
  expSteps: { type: Number, default: 20 },
  gridCols: { type: Number, default: 60 },
  gridRows: { type: Number, default: 4 },
})

const linearBlocks = ref([])
const expBlocks = ref([])
const linearDone = ref(false)
const expDone = ref(false)
const expOverflow = ref(false)
const expFinalCount = ref(0)

let linearTimer = null
let expTimer = null

const totalSlots = props.gridCols * props.gridRows

function startLinear() {
  if (linearTimer) return
  let step = 0
  linearBlocks.value = []
  linearDone.value = false

  linearTimer = setInterval(() => {
    if (step >= props.linearSteps) {
      clearInterval(linearTimer)
      linearTimer = null
      linearDone.value = true
      return
    }
    if (linearBlocks.value.length > 0) {
      linearBlocks.value[linearBlocks.value.length - 1].highlight = false
    }
    linearBlocks.value.push({ id: step, highlight: true })
    step++
  }, props.linearDuration)
}

function startExponential() {
  if (expTimer) return
  let step = 0
  expBlocks.value = []
  expDone.value = false
  expOverflow.value = false
  let totalPlaced = 0

  expTimer = setInterval(() => {
    if (step >= props.expSteps) {
      clearInterval(expTimer)
      expTimer = null
      expDone.value = true
      return
    }

    // Un-highlight previous blocks (only visible ones)
    expBlocks.value.forEach(b => b.highlight = false)

    const count = Math.pow(2, step)
    totalPlaced += count
    expFinalCount.value = totalPlaced

    // Only add blocks up to the visible grid limit
    const currentLen = expBlocks.value.length
    const slotsLeft = totalSlots - currentLen
    const toAdd = Math.min(count, slotsLeft)
    for (let i = 0; i < toAdd; i++) {
      expBlocks.value.push({ id: currentLen + i, highlight: true })
    }

    if (totalPlaced >= totalSlots && !expOverflow.value) {
      expOverflow.value = true
    }

    // Stop early once grid is full — keep counting for display but no more DOM
    if (currentLen >= totalSlots && step >= props.expSteps - 1) {
      clearInterval(expTimer)
      expTimer = null
      expDone.value = true
    }

    step++
  }, props.expDuration)
}

function cleanup() {
  if (linearTimer) { clearInterval(linearTimer); linearTimer = null }
  if (expTimer) { clearInterval(expTimer); expTimer = null }
}

watch(() => props.runLinear, (val) => {
  if (val) startLinear()
})

watch(() => props.runExp, (val) => {
  if (val) startExponential()
})

onDeactivated(() => {
  cleanup()
  linearBlocks.value = []
  expBlocks.value = []
})
</script>

<template>
  <div class="lve-container">
    <!-- Top half: Linear -->
    <div class="lve-half">
      <div class="lve-label">
        <span class="lve-label-text">30 linear steps → 30 meters</span>
      </div>
      <div class="lve-grid" :style="{ '--cols': gridCols, '--rows': gridRows }">
        <div
          v-for="block in linearBlocks"
          :key="'l-' + block.id"
          class="lve-block"
          :class="{ 'lve-block--highlight': block.highlight }"
        ></div>
      </div>
    </div>

    <!-- Divider -->
    <div class="lve-divider"></div>

    <!-- Bottom half: Exponential -->
    <div class="lve-half">
      <div class="lve-label">
        <span class="lve-label-text">30 exponential steps → <template v-if="expDone">{{ expFinalCount.toLocaleString() }} meters</template><template v-else>?</template></span>
      </div>
      <div class="lve-grid" :style="{ '--cols': gridCols, '--rows': gridRows }" :class="{ 'lve-grid--overflow': expOverflow }">
        <div
          v-for="block in expBlocks"
          :key="'e-' + block.id"
          class="lve-block"
          :class="{ 'lve-block--highlight': block.highlight }"
        ></div>
      </div>
      <div v-if="expOverflow" class="lve-overflow-glow"></div>
    </div>
  </div>
</template>

<style scoped>
.lve-container {
  position: absolute;
  inset: 0;
  background: var(--color-bg, #0a0a0f);
  display: flex;
  flex-direction: column;
  padding: calc(2.5rem * var(--cs, 1)) calc(3rem * var(--cs, 1));
  gap: 0;
}

.lve-half {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(0.6rem * var(--cs, 1));
  position: relative;
}

.lve-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: calc(0.5rem * var(--cs, 1)) 0;
}

.lve-label {
  display: flex;
  align-items: center;
}

.lve-label-text {
  font-family: var(--font-editorial, 'Cormorant Garamond', serif);
  font-size: calc(1.1rem * var(--cs, 1));
  color: var(--color-text-muted, #8a8698);
  font-style: italic;
}

.lve-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  grid-auto-flow: row;
  gap: calc(0.12rem * var(--cs, 1));
  flex: 1;
  max-height: calc(14rem * var(--cs, 1));
}

.lve-grid--overflow {
  box-shadow: inset 0 0 calc(2rem * var(--cs, 1)) rgba(245, 158, 11, 0.3);
}

.lve-block {
  background: var(--color-surface, #22222e);
  border-radius: calc(0.1rem * var(--cs, 1));
  transition: background 0.25s ease;
}

.lve-block--highlight {
  background: var(--color-accent, #f59e0b);
  transition: background 0.05s ease;
}

.lve-overflow-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(4rem * var(--cs, 1));
  background: linear-gradient(to top, rgba(245, 158, 11, 0.15), transparent);
  pointer-events: none;
}
</style>
