'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/hooks/useStore'

interface ParticlesProps {
  count?: number
}

function mulberry32(seed: number) {
  let t = seed
  return () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function Particles({ count = 2000 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const primaryColor = useStore((state) => state.scene.primaryColor)

  const particlesPosition = useMemo(() => {
    const rng = mulberry32(count)
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const theta = rng() * Math.PI * 2
      const phi = Math.acos(2 * rng() - 1)
      const r = 3 + rng() * 7

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }

    return {
      positions,
      basePositions: new Float32Array(positions),
    }
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const { mouse, scroll } = useStore.getState()
    const scrollProgress = scroll.progress

    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.rotation.x = mouse.normalizedY * 0.1
    pointsRef.current.rotation.z = mouse.normalizedX * 0.1

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      positions[i3 + 1] =
        particlesPosition.basePositions[i3 + 1] +
        Math.sin(state.clock.elapsedTime + i * 0.01) * 0.05
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    const baseOpacity = 0.6
    const scrollOpacity = Math.max(0.2, baseOpacity - scrollProgress * 0.4)
    const material = pointsRef.current.material as THREE.PointsMaterial
    material.opacity = scrollOpacity
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={primaryColor}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
