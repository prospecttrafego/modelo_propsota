'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { SmoothScrollWrapper } from '@/components/layout/SmoothScrollWrapper'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/dom/Preloader'
import { HeroSection } from '@/components/dom/HeroSection'
import { ProblemSection } from '@/components/dom/ProblemSection'
import { SolutionSection } from '@/components/dom/SolutionSection'
import { InteractiveDemo } from '@/components/dom/InteractiveDemo'
import { ROICalculator } from '@/components/dom/ROICalculator'
import { PricingSection } from '@/components/dom/PricingSection'
import { FinalCall } from '@/components/dom/FinalCall'
import { useMouse } from '@/hooks/useMouse'

const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => null,
  }
)

function MouseTracker() {
  useMouse()
  return null
}

export default function Home() {
  return (
    <>
      <Preloader />

      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      <MouseTracker />

      <SmoothScrollWrapper>
        <Navbar />

        <main className="content-layer">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <InteractiveDemo />
          <ROICalculator />
          <PricingSection />
          <FinalCall />
        </main>

        <Footer />
      </SmoothScrollWrapper>
    </>
  )
}
