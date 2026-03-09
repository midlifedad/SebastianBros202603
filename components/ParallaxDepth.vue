<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, layers, animId, mouseX = 0, mouseY = 0

function init() {
  const el = container.value
  if (!el) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 10)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  el.appendChild(renderer.domElement)

  layers = []

  const amber = new THREE.Color('#f59e0b')
  const blue = new THREE.Color('#1a2ffb')
  const green = new THREE.Color('#c1ff00')

  // Create particle layers at different depths
  const layerConfigs = [
    { z: -8, count: 600, color: blue, size: 0.02, opacity: 0.2, speed: 0.3 },
    { z: -4, count: 400, color: amber, size: 0.03, opacity: 0.4, speed: 0.5 },
    { z: -1, count: 200, color: green, size: 0.04, opacity: 0.6, speed: 0.8 },
    { z: 2, count: 80, color: amber, size: 0.06, opacity: 0.8, speed: 1.2 }
  ]

  layerConfigs.forEach(config => {
    const positions = new Float32Array(config.count * 3)
    const colors = new Float32Array(config.count * 3)
    for (let i = 0; i < config.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = config.z + (Math.random() - 0.5) * 2
      colors[i * 3] = config.color.r
      colors[i * 3 + 1] = config.color.g
      colors[i * 3 + 2] = config.color.b
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({
      size: config.size,
      vertexColors: true,
      transparent: true,
      opacity: config.opacity,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })
    const points = new THREE.Points(geo, mat)
    points.userData = { speed: config.speed, baseZ: config.z }
    scene.add(points)
    layers.push(points)
  })

  // Add thin horizontal lines at different depths for structure
  for (let i = 0; i < 6; i++) {
    const y = (i - 2.5) * 2
    const z = -6 + i * 1.5
    const points = [
      new THREE.Vector3(-12, y, z),
      new THREE.Vector3(12, y, z)
    ]
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
    const lineMat = new THREE.LineBasicMaterial({
      color: amber,
      transparent: true,
      opacity: 0.04 + i * 0.01
    })
    scene.add(new THREE.Line(lineGeo, lineMat))
  }

  window.addEventListener('mousemove', onMouse)
  animate()
}

function onMouse(e) {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2
}

function animate() {
  animId = requestAnimationFrame(animate)
  const t = Date.now() * 0.001

  layers.forEach(layer => {
    // Parallax: layers at different depths respond differently to mouse
    const factor = layer.userData.speed
    layer.position.x += (mouseX * factor * 0.3 - layer.position.x) * 0.02
    layer.position.y += (-mouseY * factor * 0.2 - layer.position.y) * 0.02
  })

  // Subtle camera sway
  camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.01
  camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.01
  camera.lookAt(0, 0, 0)

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
  window.removeEventListener('mousemove', onMouse)
  if (renderer) { renderer.dispose(); renderer.domElement.remove() }
})
</script>

<template>
  <div ref="container" class="parallax-depth-container" />
</template>

<style scoped>
.parallax-depth-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.parallax-depth-container canvas {
  display: block;
  pointer-events: auto;
}
</style>
