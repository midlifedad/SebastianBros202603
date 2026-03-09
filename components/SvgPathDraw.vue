<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  delay: { type: Number, default: 300 },
  duration: { type: Number, default: 2500 },
  color: { type: String, default: 'var(--color-accent)' },
  strokeWidth: { type: Number, default: 4 }
})

const svgRef = ref(null)
const pathRef = ref(null)
const pathRef2 = ref(null)

function animatePath(el, duration, delay) {
  const len = el.getTotalLength()
  el.style.transition = 'none'
  el.style.strokeDasharray = len
  el.style.strokeDashoffset = len
  void el.getBoundingClientRect()
  el.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.35, 0, 0, 1) ${delay}ms`
  el.style.strokeDashoffset = '0'
}

function resetPath(el) {
  if (!el) return
  const len = el.getTotalLength()
  el.style.transition = 'none'
  el.style.strokeDasharray = len
  el.style.strokeDashoffset = len
}

let observer, isAnimating = false
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isAnimating) {
      isAnimating = true
      setTimeout(() => {
        if (pathRef.value) animatePath(pathRef.value, props.duration, 0)
        if (pathRef2.value) animatePath(pathRef2.value, props.duration * 1.3, props.duration * 0.2)
      }, props.delay)
    } else if (!entries[0].isIntersecting && isAnimating) {
      // Reset when leaving so it replays on re-entry
      isAnimating = false
      resetPath(pathRef.value)
      resetPath(pathRef2.value)
    }
  })
  if (svgRef.value) observer.observe(svgRef.value)
})
onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <svg
    ref="svgRef"
    class="svg-path-draw"
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      ref="pathRef"
      d="M-20 900 C 300 870, 450 300, 750 525 S 1050 150, 1275 375 S 1500 750, 1650 270 S 1800 600, 1940 180"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      fill="none"
    />
    <path
      ref="pathRef2"
      d="M-20 975 C 375 930, 525 525, 825 675 S 1125 300, 1350 525 S 1575 825, 1725 420 S 1875 675, 1940 330"
      :stroke="color"
      :stroke-width="strokeWidth * 0.5"
      stroke-linecap="round"
      fill="none"
      opacity="0.3"
    />
  </svg>
</template>

<style scoped>
.svg-path-draw {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
