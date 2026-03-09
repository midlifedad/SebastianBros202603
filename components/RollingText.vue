<script setup>
const props = defineProps({
  text: { type: String, default: '' },
  tag: { type: String, default: 'span' },
  color: { type: String, default: 'var(--color-accent)' }
})
</script>

<template>
  <component :is="tag" class="rolling-text">
    <span
      v-for="(char, i) in text.split('')"
      :key="i"
      class="rolling-char-wrapper"
      :class="{ 'is-space': char === ' ' }"
    >
      <span class="rolling-char rolling-char-top">{{ char }}</span>
      <span class="rolling-char rolling-char-bottom" :style="{ color }">{{ char }}</span>
    </span>
  </component>
</template>

<style scoped>
.rolling-text {
  display: inline-block;
  cursor: default;
}
.rolling-char-wrapper {
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 1.15em;
  padding: 0 0.04em;
  vertical-align: bottom;
}
.rolling-char-wrapper.is-space {
  width: 0.3em;
}
.rolling-char {
  display: block;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.1, 1);
  will-change: transform;
  line-height: 1.1;
}
.rolling-char-top {
  position: relative;
}
.rolling-char-bottom {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(140%);
}
.rolling-text:hover .rolling-char-top {
  transform: translateY(-140%);
}
.rolling-text:hover .rolling-char-bottom {
  transform: translateY(0);
}
/* Stagger the character animations */
.rolling-char-wrapper:nth-child(1) .rolling-char { transition-delay: 0ms; }
.rolling-char-wrapper:nth-child(2) .rolling-char { transition-delay: 15ms; }
.rolling-char-wrapper:nth-child(3) .rolling-char { transition-delay: 30ms; }
.rolling-char-wrapper:nth-child(4) .rolling-char { transition-delay: 45ms; }
.rolling-char-wrapper:nth-child(5) .rolling-char { transition-delay: 60ms; }
.rolling-char-wrapper:nth-child(6) .rolling-char { transition-delay: 75ms; }
.rolling-char-wrapper:nth-child(7) .rolling-char { transition-delay: 90ms; }
.rolling-char-wrapper:nth-child(8) .rolling-char { transition-delay: 105ms; }
.rolling-char-wrapper:nth-child(9) .rolling-char { transition-delay: 120ms; }
.rolling-char-wrapper:nth-child(10) .rolling-char { transition-delay: 135ms; }
.rolling-char-wrapper:nth-child(11) .rolling-char { transition-delay: 150ms; }
.rolling-char-wrapper:nth-child(12) .rolling-char { transition-delay: 165ms; }
.rolling-char-wrapper:nth-child(13) .rolling-char { transition-delay: 180ms; }
.rolling-char-wrapper:nth-child(14) .rolling-char { transition-delay: 195ms; }
.rolling-char-wrapper:nth-child(15) .rolling-char { transition-delay: 210ms; }
.rolling-char-wrapper:nth-child(n+16) .rolling-char { transition-delay: 225ms; }
</style>
