'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-background"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary-bg/50 border border-brand-primary/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <span className="text-sm text-brand-primary font-medium">
            Proposta Comercial 2026
          </span>
        </motion.div>

        <AnimatedText
          text="O Futuro da Sua"
          animation="words"
          delay={0.6}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-brand-text mb-2"
        />

        <AnimatedText
          text="Operação"
          animation="words"
          delay={0.8}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-brand-primary mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg md:text-xl text-brand-text-secondary max-w-2xl mx-auto mb-12"
        >
          Automatize processos, escale atendimento e tome decisões com
          inteligência artificial de última geração.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" magnetic>
            Ver Proposta Completa
          </Button>
          <Button variant="outline" size="lg">
            Agendar Demonstração
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-brand-text-secondary">Role para explorar</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-brand-primary" />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-surface-light/50 pointer-events-none" />
    </section>
  )
}
