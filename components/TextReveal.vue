<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

const props = defineProps({
  text: { type: String, default: '' },
  tag: { type: String, default: 'div' },
  delay: { type: Number, default: 0 },
  stagger: { type: Number, default: 80 },
  duration: { type: Number, default: 700 },
  animate: { type: Boolean, default: true }
})

const containerRef = ref(null)
const lines = computed(() => props.text.split('\n').map(line => line.split(' ')))
const revealed = ref(!props.animate)

let observer
onMounted(() => {
  if (props.animate) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !revealed.value) {
        setTimeout(() => { revealed.value = true }, props.delay)
        observer.disconnect()
      }
    })
    if (containerRef.value) observer.observe(containerRef.value)
  }
})
onUnmounted(() => {
  if (observer) observer.disconnect()
})

watch(() => props.animate, (val) => {
  if (val) {
    setTimeout(() => { revealed.value = true }, props.delay)
  } else {
    revealed.value = false
  }
})

function wordDelay(lineIdx, wordIdx) {
  let count = 0
  for (let i = 0; i < lineIdx; i++) count += lines.value[i].length
  count += wordIdx
  return count * props.stagger
}
</script>

<template>
  <component :is="tag" ref="containerRef" class="text-reveal">
    <span
      v-for="(line, li) in lines"
      :key="li"
      class="text-reveal-line"
    >
      <span
        v-for="(word, wi) in line"
        :key="wi"
        class="text-reveal-word-mask"
      >
        <span
          class="text-reveal-word"
          :class="{ 'is-revealed': revealed }"
          :style="{
            transitionDelay: revealed ? wordDelay(li, wi) + 'ms' : '0ms',
            transitionDuration: duration + 'ms'
          }"
        >{{ word }}</span>
      </span>
      <br v-if="li < lines.length - 1" />
    </span>
  </component>
</template>

<style scoped>
.text-reveal {
  display: block;
}
.text-reveal-line {
  display: block;
}
.text-reveal-word-mask {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding-bottom: 0.08em;
}
.text-reveal-word {
  display: inline-block;
  transform: translateY(120%);
  transition: transform var(--reveal-duration, 700ms) cubic-bezier(0.4, 0, 0.1, 1);
  will-change: transform;
  margin-right: 0.3em;
}
.text-reveal-word.is-revealed {
  transform: translateY(0);
}
</style>
