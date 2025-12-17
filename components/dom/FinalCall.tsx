'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Rocket } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Button } from '@/components/ui/Button'

export function FinalCall() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])

  return (
    <section
      ref={ref}
      id="cta"
      className="relative min-h-screen flex items-center justify-center py-32"
    >
      <div className="absolute inset-0 bg-gradient-radial from-brand-primary/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-primary/10 mb-8 relative"
        >
          <Rocket className="w-12 h-12 text-brand-primary" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-brand-primary/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <AnimatedText
          text="Pronto para"
          animation="words"
          className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-brand-text mb-2"
        />
        <AnimatedText
          text="Transformar?"
          animation="words"
          delay={0.3}
          className="text-4xl md:text-5xl lg:text-7xl font-display font-bold gradient-text text-glow-primary mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl text-brand-muted max-w-2xl mx-auto mb-12"
        >
          Sua concorrência já está automatizando.
          Não fique para trás. Inicie sua transformação hoje.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="xl" magnetic className="group">
            Iniciar Transformação
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { label: 'Setup em', value: '7 dias' },
            { label: 'Garantia de', value: '30 dias' },
            { label: 'Suporte', value: '24/7' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-3xl font-bold text-brand-primary">{item.value}</p>
              <p className="text-sm text-brand-muted">{item.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-sm text-brand-muted"
        >
          Sem compromisso. Cancele quando quiser.
        </motion.p>
      </motion.div>
    </section>
  )
}
