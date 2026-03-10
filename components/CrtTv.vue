<script setup>
import { ref, watch, onUnmounted, onMounted } from 'vue'

const props = defineProps({
  src: { type: String, default: '/video.mp4' },
  poster: { type: String, default: '' },
  muted: { type: Boolean, default: true },
  zoomDuration: { type: Number, default: 20 },
  active: { type: Boolean, default: false },
  titleText: { type: String, default: '' },
  titleDelay: { type: Number, default: 500 },
  titleHold: { type: Number, default: 2000 },
  titleFadeOut: { type: Number, default: 1000 }
})

const videoRef = ref(null)
const zooming = ref(false)
const ended = ref(false)
const revealed = ref(false)
const titleVisible = ref(false)
const titleDismissed = ref(false)

watch(() => props.active, (val) => {
  if (val && videoRef.value) {
    // Start video immediately (under the black)
    videoRef.value.play().catch(() => {})

    // Step 1: Fade in title on black screen
    setTimeout(() => {
      titleVisible.value = true
    }, props.titleDelay)

    // Step 2: Fade title back out (still on black)
    setTimeout(() => {
      titleDismissed.value = true
    }, props.titleDelay + props.titleHold)

    // Step 3: After title has faded out, dissolve black to reveal video + start zoom
    setTimeout(() => {
      revealed.value = true
      zooming.value = true
    }, props.titleDelay + props.titleHold + props.titleFadeOut)
  } else if (!val && videoRef.value) {
    // Reset everything
    videoRef.value.pause()
    videoRef.value.currentTime = 0
    zooming.value = false
    ended.value = false
    revealed.value = false
    titleVisible.value = false
    titleDismissed.value = false
  }
})

let timeUpdateHandler = null

function onTimeUpdate() {
  if (!videoRef.value) return
  const remaining = videoRef.value.duration - videoRef.value.currentTime
  // Start fading to black 2 seconds before the end
  if (remaining <= 2 && !ended.value) {
    ended.value = true
  }
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener('timeupdate', onTimeUpdate)
  }
})

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.removeEventListener('timeupdate', onTimeUpdate)
  }
})

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
})
</script>

<template>
  <div
    class="crt-wrapper"
    :class="{ 'crt-wrapper--zooming': zooming }"
    :style="{ '--zoom-duration': zoomDuration + 's' }"
  >
    <!-- TV Body -->
    <div class="crt-body">
      <div class="crt-bezel">
        <div class="crt-screen">
          <div class="crt-screen-inner">
            <video
              ref="videoRef"
              :src="src"
              :poster="poster"
              :muted="muted"
              playsinline
              class="crt-video"
            />

            <!-- Vignette -->
            <div class="crt-vignette"></div>

            <!-- Glare -->
            <div class="crt-glare"></div>

            <!-- Black overlay — inside the screen, in front of video but behind TV body -->
            <div class="crt-blackout" :class="{ 'crt-blackout--hidden': revealed && !ended, 'crt-blackout--active': ended }">
              <span v-if="titleText" class="crt-title" :class="{ 'crt-title--visible': titleVisible && !titleDismissed }">{{ titleText }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crt-wrapper {
  --crt-body-bg: #2a2520;
  --crt-body-light: #3d3630;
  --crt-body-dark: #1a1510;
  --crt-bezel-bg: #1a1612;
  --crt-screen-radius: 10% / 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: 100%;
  height: 100%;
  transform: scale(0.55);
}

.crt-wrapper--zooming {
  animation: crt-push-in var(--zoom-duration, 20s) ease-in-out forwards;
}

@keyframes crt-push-in {
  0% {
    transform: scale(0.55);
  }
  100% {
    transform: scale(1.0);
  }
}

/* ---- TV Body ---- */
.crt-body {
  width: 80%;
  background: var(--crt-body-bg);
  border-radius: calc(1.5rem * var(--cs, 1));
  box-shadow:
    inset 0 calc(0.15rem * var(--cs, 1)) 0 var(--crt-body-light),
    inset 0 calc(-0.15rem * var(--cs, 1)) 0 var(--crt-body-dark),
    0 calc(0.5rem * var(--cs, 1)) calc(2rem * var(--cs, 1)) rgba(0,0,0,0.6),
    0 0 calc(6rem * var(--cs, 1)) rgba(0,0,0,0.4);
  padding: calc(1.2rem * var(--cs, 1)) calc(1.2rem * var(--cs, 1)) calc(2.5rem * var(--cs, 1));
}

/* ---- Bezel ---- */
.crt-bezel {
  background: var(--crt-bezel-bg);
  border-radius: calc(1rem * var(--cs, 1));
  padding: calc(0.8rem * var(--cs, 1));
  box-shadow:
    inset 0 calc(0.2rem * var(--cs, 1)) calc(0.4rem * var(--cs, 1)) rgba(0,0,0,0.6),
    inset 0 calc(-0.08rem * var(--cs, 1)) calc(0.15rem * var(--cs, 1)) rgba(255,255,255,0.03);
}

/* ---- Screen ---- */
.crt-screen {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--crt-screen-radius);
  overflow: hidden;
  position: relative;
  background: #000;
  box-shadow:
    0 0 calc(1.5rem * var(--cs, 1)) rgba(140, 180, 255, 0.12),
    0 0 calc(4rem * var(--cs, 1)) rgba(140, 180, 255, 0.04);
}

.crt-screen-inner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 6% / 8%;
}

.crt-video {
  width: 112%;
  height: 112%;
  object-fit: cover;
  position: absolute;
  top: -4%;
  left: 0%;
}

/* ---- Vignette ---- */
.crt-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 55%,
    rgba(0, 0, 0, 0.3) 85%,
    rgba(0, 0, 0, 0.6) 100%
  );
  pointer-events: none;
  z-index: 4;
}

/* ---- Screen glare ---- */
.crt-glare {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06) 0%,
    transparent 40%,
    transparent 60%,
    rgba(255, 255, 255, 0.02) 100%
  );
  pointer-events: none;
  z-index: 6;
}

/* ---- Black overlay (inside screen) ---- */
.crt-blackout {
  position: absolute;
  inset: -10%;
  background: #000;
  opacity: 1;
  pointer-events: none;
  z-index: 7;
  transition: opacity 1.5s ease-out;
}

.crt-blackout--hidden {
  opacity: 0;
}

.crt-blackout--active {
  opacity: 1;
  transition: opacity 2s ease-in;
}

/* ---- Title on black screen ---- */
.crt-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-serif, 'Playfair Display', serif);
  font-size: calc(1.4rem * var(--cs, 1));
  color: rgba(240, 236, 228, 0.8);
  letter-spacing: calc(0.05rem * var(--cs, 1));
  white-space: nowrap;
  opacity: 0;
  transition: opacity 1s ease-in;
  z-index: 1;
}

.crt-title--visible {
  opacity: 1;
}
</style>
