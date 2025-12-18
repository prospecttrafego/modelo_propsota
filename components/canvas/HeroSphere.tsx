'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '@/hooks/useStore'
import { lerp } from '@/lib/utils'

interface HeroSphereProps {
  scrollProgress: number
  currentSection: number
}

export function HeroSphere({ scrollProgress, currentSection }: HeroSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useStore((state) => state.mouse)
  const primaryColor = useStore((state) => state.scene.primaryColor)
  const secondaryColor = useStore((state) => state.scene.secondaryColor)

  const targetRotation = useRef(new THREE.Vector2(0, 0))
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0))
  const targetScale = useRef(new THREE.Vector3(1, 1, 1))

  useFrame((state, delta) => {
    if (!meshRef.current) return

    targetRotation.current.x = mouse.normalizedY * 0.3
    targetRotation.current.y = mouse.normalizedX * 0.3

    meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, targetRotation.current.x, delta * 2)
    meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, targetRotation.current.y, delta * 2)

    meshRef.current.rotation.z += delta * 0.1

    if (currentSection === 0) {
      targetPosition.current.set(0, 0, 0)
      targetScale.current.set(1, 1, 1)
    } else if (currentSection === 1) {
      targetPosition.current.set(2, 0, -2)
      targetScale.current.set(0.8, 0.8, 0.8)
    } else if (currentSection === 2) {
      targetPosition.current.set(-2, 0, -3)
      targetScale.current.set(0.5, 0.5, 0.5)
    } else {
      targetPosition.current.set(0, -2, -5)
      targetScale.current.set(0.3, 0.3, 0.3)
    }

    meshRef.current.position.lerp(targetPosition.current, delta * 2)
    meshRef.current.scale.lerp(targetScale.current, delta * 2)
  })

  const distortSpeed = useMemo(() => 2 + scrollProgress * 3, [scrollProgress])
  const distortStrength = useMemo(() => 0.3 + scrollProgress * 0.2, [scrollProgress])

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color={primaryColor}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.15}
        roughness={0.1}
        distort={distortStrength}
        speed={distortSpeed}
        emissive={secondaryColor}
        emissiveIntensity={0.4}
      />
    </Sphere>
  )
}
