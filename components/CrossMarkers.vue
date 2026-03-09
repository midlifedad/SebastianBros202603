<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  count: { type: Number, default: 4 },
  positions: { type: Array, default: () => [] },
  color: { type: String, default: 'var(--color-text-dim)' },
  size: { type: [String, Number], default: 28 },
  delay: { type: Number, default: 200 },
  animate: { type: Boolean, default: true }
})

const scaledSize = computed(() =>
  typeof props.size === 'number' ? `calc(${props.size}px * var(--cs))` : props.size
)

const markersRef = ref(null)
const revealed = ref(!props.animate)

// Default positions: corners
const computedPositions = props.positions.length
  ? props.positions
  : [
    { top: '0', left: '0' },
    { top: '0', right: '0' },
    { bottom: '0', left: '0' },
    { bottom: '0', right: '0' }
  ].slice(0, props.count)

let observer
onMounted(() => {
  if (props.animate) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !revealed.value) {
        setTimeout(() => { revealed.value = true }, props.delay)
        observer.disconnect()
      }
    })
    if (markersRef.value) observer.observe(markersRef.value)
  }
})
onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div ref="markersRef" class="cross-markers">
    <div
      v-for="(pos, i) in computedPositions"
      :key="i"
      class="cross-marker"
      :class="{ 'is-revealed': revealed }"
      :style="{
        ...pos,
        '--cross-size': scaledSize,
        '--cross-color': color,
        transitionDelay: (i * 100 + delay) + 'ms'
      }"
    />
  </div>
</template>

<style scoped>
.cross-markers {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.cross-marker {
  position: absolute;
  width: var(--cross-size, 14px);
  height: var(--cross-size, 14px);
  transform: scale(0) rotate(0deg);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.1, 1);
  will-change: transform;
}
.cross-marker.is-revealed {
  transform: scale(1) rotate(90deg);
}
.cross-marker::before,
.cross-marker::after {
  content: '';
  position: absolute;
  background: var(--cross-color, rgba(255,255,255,0.2));
}
.cross-marker::before {
  width: 100%;
  height: 1.5px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.cross-marker::after {
  height: 100%;
  width: 1.5px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
</style>
