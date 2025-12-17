'use client'

import { useEffect } from 'react'
import { useStore } from './useStore'
import { throttle } from '@/lib/utils'

export function useMouse() {
  const setMouse = useStore((state) => state.setMouse)

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      const normalizedX = (x / window.innerWidth) * 2 - 1
      const normalizedY = -(y / window.innerHeight) * 2 + 1

      setMouse({ x, y, normalizedX, normalizedY })
    }, 16)

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [setMouse])
}
