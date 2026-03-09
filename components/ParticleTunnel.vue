<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, tunnel, animId

function init() {
  const el = container.value
  if (!el) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  el.appendChild(renderer.domElement)

  tunnel = new THREE.Group()

  const count = 5000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  const amber = new THREE.Color('#f59e0b')
  const blue = new THREE.Color('#1a2ffb')
  const teal = new THREE.Color('#2dd4bf')

  for (let i = 0; i < count; i++) {
    const t = Math.random()
    const angle = Math.random() * Math.PI * 2
    const radius = 2 + Math.random() * 3
    const depth = t * 60 - 30

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = Math.sin(angle) * radius
    positions[i * 3 + 2] = depth

    const c = new THREE.Color()
    if (t < 0.33) c.lerpColors(amber, blue, t * 3)
    else if (t < 0.66) c.lerpColors(blue, teal, (t - 0.33) * 3)
    else c.lerpColors(teal, amber, (t - 0.66) * 3)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b

    sizes[i] = 0.5 + Math.random() * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })

  tunnel.add(new THREE.Points(geometry, material))

  // Add ring guides along the tunnel
  for (let i = 0; i < 15; i++) {
    const ringGeo = new THREE.RingGeometry(2.8, 3, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: amber,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.z = i * 4 - 30
    tunnel.add(ring)
  }

  scene.add(tunnel)
  animate()
}

function animate() {
  animId = requestAnimationFrame(animate)
  const t = Date.now() * 0.0003

  if (tunnel) {
    // Slowly fly through the tunnel
    tunnel.position.z = (t * 5) % 4

    // Gentle rotation for immersion
    tunnel.rotation.z = Math.sin(t) * 0.08
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
  if (renderer) { renderer.dispose(); renderer.domElement.remove() }
})
</script>

<template>
  <div ref="container" class="particle-tunnel-container" />
</template>

<style scoped>
.particle-tunnel-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.particle-tunnel-container canvas { display: block; }
</style>
