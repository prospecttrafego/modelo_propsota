'use client'

import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'
import { useStore } from '@/hooks/useStore'

interface SmoothScrollWrapperProps {
  children: ReactNode
}

export function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const setScroll = useStore((state) => state.setScroll)
  const setCurrentSection = useStore((state) => state.setCurrentSection)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    let lastScroll = 0

    lenis.on('scroll', ({ scroll, velocity, progress }: { scroll: number; velocity: number; progress: number }) => {
      const direction = scroll > lastScroll ? 'down' : scroll < lastScroll ? 'up' : null
      lastScroll = scroll

      setScroll({
        progress,
        velocity,
        direction,
      })
    })

    let rafId: number | null = null
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    document.documentElement.classList.add('lenis')

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      lenis.destroy()
      document.documentElement.classList.remove('lenis')
    }
  }, [setScroll])

  useEffect(() => {
    const sectionIds = ['hero', 'problem', 'solution', 'demo', 'roi', 'pricing', 'cta'] as const
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const elementToIndex = new Map<HTMLElement, number>()
    const ratios = new Map<HTMLElement, number>()

    sections.forEach((el, idx) => elementToIndex.set(el, idx))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target as HTMLElement, entry.intersectionRatio)
        }

        let activeIndex = 0
        let maxRatio = 0

        for (const el of sections) {
          const ratio = ratios.get(el) ?? 0
          if (ratio > maxRatio) {
            maxRatio = ratio
            activeIndex = elementToIndex.get(el) ?? 0
          }
        }

        setCurrentSection(activeIndex)
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [setCurrentSection])

  return (
    <div className="smooth-scroll-wrapper">
      {children}
    </div>
  )
}
