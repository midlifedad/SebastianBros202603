<script setup>
import { ref, watch, computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total } = useNav()
const visible = ref(true)
let timer = null

function getDuration() {
  const val = getComputedStyle(document.documentElement).getPropertyValue('--slide-number-duration').trim()
  return parseFloat(val) * 1000 || 2000
}

function isEnabled() {
  const val = getComputedStyle(document.documentElement).getPropertyValue('--slide-number-display').trim()
  return val !== 'none'
}

watch(currentPage, () => {
  if (!isEnabled()) {
    visible.value = false
    return
  }
  visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
  }, getDuration())
}, { immediate: true })
</script>

<template>
  <Transition name="fade-number">
    <div v-if="visible" class="slide-footer">
      <span class="slide-number">{{ currentPage }} / {{ total }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.slide-footer {
  position: fixed;
  bottom: calc(0.5rem * var(--cs, 1));
  left: var(--slide-number-left, calc(0.75rem * var(--cs, 1)));
  right: var(--slide-number-right, auto);
  z-index: 100;
  pointer-events: none;
}

.slide-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: calc(0.5rem * var(--cs, 1));
  color: rgba(138, 134, 152, 0.5);
  letter-spacing: 0.05em;
}

.fade-number-enter-active {
  transition: opacity 0.2s ease;
}
.fade-number-leave-active {
  transition: opacity 0.8s ease;
}
.fade-number-enter-from,
.fade-number-leave-to {
  opacity: 0;
}
</style>
