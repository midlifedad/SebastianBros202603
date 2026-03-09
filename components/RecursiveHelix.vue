<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, group, animId

function init() {
  const el = container.value
  if (!el) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 1000)
  camera.position.set(0, 0, 12)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  el.appendChild(renderer.domElement)

  group = new THREE.Group()

  // Double helix spiral
  const strands = 2
  const pointsPerStrand = 800
  const amber = new THREE.Color('#f59e0b')
  const blue = new THREE.Color('#1a2ffb')
  const green = new THREE.Color('#c1ff00')

  for (let s = 0; s < strands; s++) {
    const positions = new Float32Array(pointsPerStrand * 3)
    const colors = new Float32Array(pointsPerStrand * 3)
    const offset = (s * Math.PI)

    for (let i = 0; i < pointsPerStrand; i++) {
      const t = i / pointsPerStrand
      const angle = t * Math.PI * 8 + offset
      const radius = 1.5 + Math.sin(t * Math.PI) * 1
      const y = (t - 0.5) * 14

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(angle) * radius

      const c = new THREE.Color()
      if (s === 0) {
        c.lerpColors(amber, blue, t)
      } else {
        c.lerpColors(blue, green, t)
      }
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    group.add(new THREE.Points(geometry, material))
  }

  // Connection lines between strands (rungs)
  const rungCount = 30
  for (let i = 0; i < rungCount; i++) {
    const t = i / rungCount
    const angle = t * Math.PI * 8
    const radius = 1.5 + Math.sin(t * Math.PI) * 1
    const y = (t - 0.5) * 14

    const points = [
      new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
      new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius)
    ]
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
    const lineMat = new THREE.LineBasicMaterial({
      color: '#f59e0b',
      transparent: true,
      opacity: 0.12
    })
    group.add(new THREE.Line(lineGeo, lineMat))
  }

  scene.add(group)
  animate()
}

function animate() {
  animId = requestAnimationFrame(animate)
  if (group) {
    group.rotation.y += 0.003
    group.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1
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
  <div ref="container" class="helix-container" />
</template>

<style scoped>
.helix-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.helix-container canvas {
  display: block;
}
</style>
