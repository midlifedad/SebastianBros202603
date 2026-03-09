<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(50)
const y = ref(50)
const opacity = ref(0)

function onMove(e) {
  x.value = (e.clientX / window.innerWidth) * 100
  y.value = (e.clientY / window.innerHeight) * 100
  opacity.value = 1
}

function onLeave() {
  opacity.value = 0
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseleave', onLeave)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div
    class="spotlight-layer"
    :style="{
      background: `radial-gradient(ellipse 600px 400px at ${x}% ${y}%, rgba(245, 158, 11, 0.06), transparent)`,
      opacity: opacity
    }"
  />
</template>

<style scoped>
.spotlight-layer {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.8s ease;
}
</style>
