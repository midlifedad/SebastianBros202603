<script setup>
import { ref, onMounted } from 'vue'

const iframe = ref(null)

onMounted(() => {
  const el = iframe.value
  if (!el) return
  // When iframe loads, reset the graph to initial state
  el.addEventListener('load', () => {
    el.contentWindow.postMessage('reset', '*')
  })
  // If already loaded (cached), reset immediately
  if (el.contentWindow) {
    el.contentWindow.postMessage('reset', '*')
  }
})
</script>

<template>
  <div style="position: absolute; inset: 0; background: #000;">
    <iframe
      ref="iframe"
      src="/graphs.html"
      style="width: 100%; height: 100%; border: none;"
      allow="accelerometer; autoplay"
    ></iframe>
  </div>
</template>
