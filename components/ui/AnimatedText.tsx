'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { cn, scrambleText } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  animation?: 'fade' | 'slide' | 'scramble' | 'words'
  delay?: number
  duration?: number
  once?: boolean
}

export function AnimatedText({
  text,
  className,
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-100px' })
  const [scrambled, setScrambled] = useState(text)

  useEffect(() => {
    if (animation !== 'scramble' || !isInView) return

    let frame = 0
    const totalFrames = 30

    const interval = setInterval(() => {
      frame++
      const newProgress = frame / totalFrames
      setScrambled(scrambleText(text, newProgress))

      if (frame >= totalFrames) {
        clearInterval(interval)
        setScrambled(text)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [animation, isInView, text])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
  }

  if (animation === 'scramble') {
    return (
      <div ref={ref} className={cn('font-mono', className)}>
        {isInView ? scrambled : text}
      </div>
    )
  }

  if (animation === 'words') {
    const words = text.split(' ')

    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={cn('flex flex-wrap gap-x-2', className)}
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: animation === 'slide' ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {text}
    </motion.div>
  )
}
