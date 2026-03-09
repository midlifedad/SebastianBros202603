<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, particles, animId

function init() {
  const el = container.value
  if (!el) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000)
  camera.position.set(0, 2, 8)
  camera.lookAt(0, 1.5, 0)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  el.appendChild(renderer.domElement)

  // Exponential curve as particles
  const count = 3000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  const amber = new THREE.Color('#f59e0b')
  const red = new THREE.Color('#ef4444')
  const blue = new THREE.Color('#1a2ffb')
  const dim = new THREE.Color('#2a2a3a')

  for (let i = 0; i < count; i++) {
    const t = i / count
    // Exponential curve path
    const x = (t - 0.5) * 12
    const y = Math.pow(2, t * 4) * 0.05 - 0.05
    // Scatter around the curve
    const scatter = (1 - t * 0.7) * 0.8
    positions[i * 3] = x + (Math.random() - 0.5) * scatter
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * scatter
    positions[i * 3 + 2] = (Math.random() - 0.5) * scatter * 2

    // Color: dim at start, amber in middle, red/blue at peak
    const c = new THREE.Color()
    if (t < 0.5) {
      c.lerpColors(dim, amber, t * 2)
    } else {
      c.lerpColors(amber, red, (t - 0.5) * 2)
    }
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b

    sizes[i] = (0.5 + t * 2.5) * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  animate()
}

function animate() {
  animId = requestAnimationFrame(animate)
  if (particles) {
    // Gentle shimmer only, no rotation
    const positions = particles.geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.0002
    }
    particles.geometry.attributes.position.needsUpdate = true
  }
  renderer.render(scene, camera)
}

let observer
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !renderer) {
      setTimeout(init, 100)
      observer.disconnect()
    }
  })
  if (container.value) observer.observe(container.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  cancelAnimationFrame(animId)
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
})
</script>

<template>
  <div ref="container" class="particle-curve-container" />
</template>

<style scoped>
.particle-curve-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.particle-curve-container canvas {
  display: block;
}
</style>
