<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, sphere, originalPositions, animId

function init() {
  const el = container.value
  if (!el) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 6)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  el.appendChild(renderer.domElement)

  // Create sphere with enough vertices to deform
  const geometry = new THREE.IcosahedronGeometry(2, 5)
  originalPositions = new Float32Array(geometry.attributes.position.array)

  const material = new THREE.MeshBasicMaterial({
    color: '#f59e0b',
    wireframe: true,
    transparent: true,
    opacity: 0.2
  })

  sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)

  // Add a subtle inner glow sphere
  const glowGeo = new THREE.IcosahedronGeometry(1.8, 3)
  const glowMat = new THREE.PointsMaterial({
    color: '#1a2ffb',
    size: 0.015,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })
  const glowPoints = new THREE.Points(glowGeo, glowMat)
  sphere.add(glowPoints)

  animate()
}

function animate() {
  animId = requestAnimationFrame(animate)
  const t = Date.now() * 0.001

  if (sphere && originalPositions) {
    const positions = sphere.geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const ox = originalPositions[i]
      const oy = originalPositions[i + 1]
      const oz = originalPositions[i + 2]

      // Spherical coordinates for noise
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const nx = ox / len
      const ny = oy / len
      const nz = oz / len

      // Multiple sine waves for organic displacement
      const displacement = 1 +
        Math.sin(nx * 3 + t * 0.8) * 0.08 +
        Math.sin(ny * 4 + t * 1.1) * 0.06 +
        Math.sin(nz * 2.5 + t * 0.9) * 0.07 +
        Math.sin((nx + ny) * 5 + t * 1.3) * 0.04

      positions[i] = ox * displacement
      positions[i + 1] = oy * displacement
      positions[i + 2] = oz * displacement
    }
    sphere.geometry.attributes.position.needsUpdate = true

    sphere.rotation.y += 0.002
    sphere.rotation.x = Math.sin(t * 0.3) * 0.1
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
  <div ref="container" class="morphing-sphere-container" />
</template>

<style scoped>
.morphing-sphere-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.morphing-sphere-container canvas { display: block; }
</style>
