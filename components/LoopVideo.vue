<script setup>
import { ref, onActivated, onDeactivated, onMounted, nextTick } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
})

const videoRef = ref(null)

function play() {
  if (videoRef.value) {
    videoRef.value.currentTime = 0
    videoRef.value.play().catch(() => {})
  }
}

function stop() {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
}

onMounted(() => {
  nextTick(play)
})
onActivated(play)
onDeactivated(stop)
</script>

<template>
  <div style="position: absolute; inset: 0; overflow: hidden; background: #000;">
    <video
      ref="videoRef"
      :src="src"
      loop
      muted
      playsinline
      style="width: 100%; height: 100%; object-fit: cover;"
    />
  </div>
</template>
