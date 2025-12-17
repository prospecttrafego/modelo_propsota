'use client'

import { useRef, useState, useCallback, MouseEvent, TouchEvent } from 'react'
import { motion } from 'framer-motion'
import { cn, clamp, formatNumber } from '@/lib/utils'

interface SliderProps {
  min: number
  max: number
  value: number
  step?: number
  label?: string
  unit?: string
  onChange: (value: number) => void
  formatValue?: (value: number) => string
  className?: string
}

export function Slider({
  min,
  max,
  value,
  step = 1,
  label,
  unit,
  onChange,
  formatValue = formatNumber,
  className,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const percentage = ((value - min) / (max - min)) * 100

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percent = clamp(x / rect.width, 0, 1)
      const rawValue = min + percent * (max - min)
      const steppedValue = Math.round(rawValue / step) * step
      const clampedValue = clamp(steppedValue, min, max)

      onChange(clampedValue)
    },
    [min, max, step, onChange]
  )

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true)
    updateValue(e.clientX)

    const handleMouseMove = (e: globalThis.MouseEvent) => updateValue(e.clientX)
    const handleMouseUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true)
    updateValue(e.touches[0].clientX)

    const handleTouchMove = (e: globalThis.TouchEvent) => updateValue(e.touches[0].clientX)
    const handleTouchEnd = () => {
      setIsDragging(false)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }

  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-brand-muted">{label}</span>
          <span className="text-lg font-semibold text-brand-primary">
            {formatValue(value)}
            {unit && <span className="text-sm text-brand-muted ml-1">{unit}</span>}
          </span>
        </div>
      )}

      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative h-2 bg-brand-surface rounded-full cursor-pointer group"
      >
        <motion.div
          className="absolute h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
          style={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <motion.div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full',
            'bg-brand-primary border-2 border-white',
            'transition-transform',
            isDragging ? 'scale-125' : 'group-hover:scale-110'
          )}
          style={{ left: `calc(${percentage}% - 10px)` }}
          animate={{
            left: `calc(${percentage}% - 10px)`,
            scale: isDragging ? 1.25 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <div
          className={cn(
            'absolute -top-10 px-2 py-1 rounded bg-brand-surface text-sm',
            'opacity-0 group-hover:opacity-100 transition-opacity',
            isDragging && 'opacity-100'
          )}
          style={{
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {formatValue(value)}
        </div>
      </div>

      <div className="flex justify-between text-xs text-brand-muted">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  )
}
