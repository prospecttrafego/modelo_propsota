'use client'

import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useStore } from '@/hooks/useStore'
import { HeroSphere } from './HeroSphere'
import { Particles } from './Particles'
import { Lights } from './Lights'

function Effects() {
  const bloomIntensity = useStore((state) => state.scene.bloomIntensity)

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}

function SceneContent() {
  return (
    <>
      <Lights />
      <HeroSphere />
      <Particles count={2000} />
      <Effects />
    </>
  )
}

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="canvas-container">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Fundo escuro esverdeado para dark mode */}
        <color attach="background" args={['#0A0F0C']} />
        <fog attach="fog" args={['#0A0F0C', 5, 20]} />

        <PerformanceMonitor
          onDecline={() => {
            useStore.getState().setScene({ bloomIntensity: 0.8 })
          }}
        >
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </PerformanceMonitor>

        <Preload all />
      </Canvas>
    </div>
  )
}
