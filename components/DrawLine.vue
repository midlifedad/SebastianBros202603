<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  width: { type: [String, Number], default: '100%' },
  height: { type: [String, Number], default: 2 },
  color: { type: String, default: 'var(--color-accent)' },
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 800 },
  direction: { type: String, default: 'left' },
  vertical: { type: Boolean, default: false },
  animate: { type: Boolean, default: true }
})

const scaledWidth = computed(() =>
  typeof props.width === 'number' ? `calc(${props.width}px * var(--cs))` : props.width
)
const scaledHeight = computed(() =>
  typeof props.height === 'number' ? `calc(${props.height}px * var(--cs))` : props.height
)

const lineRef = ref(null)
const drawn = ref(!props.animate)

let observer
onMounted(() => {
  if (props.animate) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !drawn.value) {
        setTimeout(() => { drawn.value = true }, props.delay)
      } else if (!entries[0].isIntersecting && drawn.value) {
        drawn.value = false
      }
    })
    if (lineRef.value) observer.observe(lineRef.value)
  }
})
onUnmounted(() => {
  if (observer) observer.disconnect()
})

const originClass = computed(() => {
  if (props.vertical) return `v-origin-${props.direction}`
  return `origin-${props.direction}`
})
</script>

<template>
  <div
    ref="lineRef"
    class="draw-line"
    :class="[originClass, { 'is-drawn': drawn, 'is-vertical': vertical }]"
    :style="{
      width: scaledWidth,
      height: scaledHeight,
      background: color,
      transitionDuration: duration + 'ms'
    }"
  />
</template>

<style scoped>
.draw-line {
  flex-shrink: 0;
  transform: scaleX(0);
  transition: transform var(--draw-duration, 800ms) cubic-bezier(0.4, 0, 0.1, 1);
  will-change: transform;
}
.draw-line.is-vertical {
  transform: scaleY(0);
}
.draw-line.origin-left { transform-origin: left center; }
.draw-line.origin-right { transform-origin: right center; }
.draw-line.origin-center { transform-origin: center center; }
.draw-line.v-origin-left { transform-origin: center top; }
.draw-line.v-origin-right { transform-origin: center bottom; }
.draw-line.v-origin-center { transform-origin: center center; }
.draw-line.is-drawn {
  transform: scaleX(1);
}
.draw-line.is-vertical.is-drawn {
  transform: scaleY(1);
}
</style>
