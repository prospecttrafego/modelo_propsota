'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useStore } from '@/hooks/useStore'

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const { isLoading } = useStore((state) => state.ui)
  const setLoadingComplete = useStore((state) => state.setLoadingComplete)
  const setUI = useStore((state) => state.setUI)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoadingComplete(), 500)
          return 100
        }
        setUI({ loadingProgress: next })
        return next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [setLoadingComplete, setUI])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src="/Logo Principal-07.png"
              alt="convert A.I"
              width={340}
              height={201}
              className="h-32 w-auto mb-8"
              priority
            />

            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-brand-primary"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <div className="w-64 h-1 bg-brand-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-brand-text-secondary font-mono"
          >
            Carregando experiência... {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
