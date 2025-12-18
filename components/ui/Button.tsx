'use client'

import { useRef, useState, MouseEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  magnetic?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary-light shadow-sm hover:shadow-md',
    secondary: 'bg-brand-primary-light text-white hover:bg-brand-primary-soft',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10',
    ghost: 'text-brand-text hover:bg-brand-surface',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl',
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'relative font-medium rounded-xl transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        magnetic && 'magnetic-button',
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}
