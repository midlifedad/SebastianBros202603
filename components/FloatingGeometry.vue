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
  camera.position.set(0, 0, 14)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  el.appendChild(renderer.domElement)

  group = new THREE.Group()

  const amber = new THREE.Color('#f59e0b')
  const blue = new THREE.Color('#1a2ffb')
  const green = new THREE.Color('#c1ff00')
  const violet = new THREE.Color('#8b5cf6')

  // Wireframe geometries floating in space
  const shapes = [
    { geo: new THREE.TorusGeometry(1.5, 0.4, 16, 40), pos: [-4, 2, -3], color: amber, speed: 0.003 },
    { geo: new THREE.IcosahedronGeometry(1.2, 0), pos: [5, -1, -2], color: blue, speed: 0.004 },
    { geo: new THREE.OctahedronGeometry(1, 0), pos: [-2, -3, -4], color: green, speed: 0.002 },
    { geo: new THREE.TorusKnotGeometry(0.8, 0.25, 64, 8), pos: [4, 3, -5], color: violet, speed: 0.005 },
    { geo: new THREE.TetrahedronGeometry(1, 0), pos: [0, 1, -6], color: amber, speed: 0.003 },
    { geo: new THREE.DodecahedronGeometry(0.9, 0), pos: [-5, 0, -3], color: blue, speed: 0.004 }
  ]

  shapes.forEach(({ geo, pos, color, speed }) => {
    const edges = new THREE.EdgesGeometry(geo)
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.35
    })
    const wireframe = new THREE.LineSegments(edges, mat)
    wireframe.position.set(...pos)
    wireframe.userData = {
      speed,
      baseY: pos[1],
      phase: Math.random() * Math.PI * 2
    }
    group.add(wireframe)
  })

  // Scattered ambient particles
  const particleCount = 400
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    const c = new THREE.Color().lerpColors(amber, blue, Math.random())
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const pMat = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })
  group.add(new THREE.Points(pGeo, pMat))

  scene.add(group)
  animate()
}

function animate() {
  animId = requestAnimationFrame(animate)
  const t = Date.now() * 0.001
  if (group) {
    group.children.forEach(child => {
      if (child.userData.speed) {
        child.rotation.x += child.userData.speed
        child.rotation.y += child.userData.speed * 0.7
        child.position.y = child.userData.baseY + Math.sin(t + child.userData.phase) * 0.5
      }
    })
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
  <div ref="container" class="floating-geo-container" />
</template>

<style scoped>
.floating-geo-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.floating-geo-container canvas { display: block; }
</style>
