'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/hooks/useStore'

export function Lights() {
  const pointLight1Ref = useRef<THREE.PointLight>(null)
  const pointLight2Ref = useRef<THREE.PointLight>(null)
  const primaryColor = useStore((state) => state.scene.primaryColor)
  const secondaryColor = useStore((state) => state.scene.secondaryColor)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (pointLight1Ref.current) {
      pointLight1Ref.current.position.x = Math.sin(t * 0.3) * 5
      pointLight1Ref.current.position.y = Math.cos(t * 0.2) * 3
      pointLight1Ref.current.position.z = Math.cos(t * 0.3) * 5
    }

    if (pointLight2Ref.current) {
      pointLight2Ref.current.position.x = Math.cos(t * 0.3) * 5
      pointLight2Ref.current.position.y = Math.sin(t * 0.2) * 3
      pointLight2Ref.current.position.z = Math.sin(t * 0.3) * 5
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />

      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
      />

      <pointLight
        ref={pointLight1Ref}
        position={[5, 3, 5]}
        intensity={1.5}
        color={primaryColor}
        distance={20}
        decay={2}
      />

      <pointLight
        ref={pointLight2Ref}
        position={[-5, -3, 5]}
        intensity={1.5}
        color={secondaryColor}
        distance={20}
        decay={2}
      />

      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color={primaryColor}
        castShadow={false}
      />
    </>
  )
}
