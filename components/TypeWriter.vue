<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  delay: { type: Number, default: 0 },
  speed: { type: Number, default: 40 },
  cursor: { type: Boolean, default: true }
})

const displayed = ref('')
const started = ref(false)
const finished = ref(false)
let timeout = null
let charIndex = 0

function typeNext() {
  if (charIndex < props.text.length) {
    displayed.value = props.text.slice(0, charIndex + 1)
    charIndex++
    timeout = setTimeout(typeNext, props.speed)
  } else {
    finished.value = true
  }
}

function start() {
  timeout = setTimeout(() => {
    started.value = true
    typeNext()
  }, props.delay)
}

start()

onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
})
</script>

<template>
  <span class="typewriter" :class="{ 'typewriter--cursor': cursor && started && !finished }">{{ displayed }}</span>
</template>

<style scoped>
.typewriter {
  display: inline;
}

.typewriter--cursor::after {
  content: '|';
  animation: blink 0.6s step-end infinite;
  color: var(--color-amber, #f59e0b);
  font-weight: 300;
  margin-left: 1px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
