'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AlertTriangle, Clock, TrendingDown, Users } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Card } from '@/components/ui/Card'

const problems = [
  {
    icon: Clock,
    title: 'Processos Manuais',
    description: 'Horas perdidas em tarefas repetitivas que poderiam ser automatizadas.',
  },
  {
    icon: Users,
    title: 'Atendimento Sobrecarregado',
    description: 'Equipe afogada em demandas, sem tempo para estratégias de valor.',
  },
  {
    icon: TrendingDown,
    title: 'Dados Desconectados',
    description: 'Informações espalhadas em sistemas que não conversam entre si.',
  },
  {
    icon: AlertTriangle,
    title: 'Decisões às Cegas',
    description: 'Falta de visibilidade em tempo real para decisões estratégicas.',
  },
]

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])

  return (
    <section
      ref={ref}
      id="problem"
      className="relative min-h-screen flex items-center py-32 bg-brand-surface-light"
    >
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <AnimatedText
            text="Sua equipe está afogada"
            animation="words"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-text mb-4"
          />
          <AnimatedText
            text="em processos?"
            animation="words"
            delay={0.3}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-primary-light mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-brand-text-secondary max-w-2xl mx-auto"
          >
            Reconheça os sinais. Empresas que não automatizam perdem
            competitividade a cada dia.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card tilt className="h-full border-brand-primary-light/20 hover:border-brand-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-primary/10">
                    <problem.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-text mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-brand-text-secondary">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
