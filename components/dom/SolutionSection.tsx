'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Bot, BarChart3, Workflow, Zap } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Card } from '@/components/ui/Card'

const solutions = [
  {
    icon: Bot,
    title: 'Agentes de IA',
    description: 'Atendimento 24/7 com respostas inteligentes e personalizadas.',
  },
  {
    icon: Workflow,
    title: 'Automação de Processos',
    description: 'Workflows inteligentes que eliminam tarefas repetitivas.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards em Tempo Real',
    description: 'Visibilidade total do negócio com métricas que importam.',
  },
  {
    icon: Zap,
    title: 'Integrações Nativas',
    description: 'Conexão perfeita com suas ferramentas existentes.',
  },
]

export function SolutionSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      id="solution"
      className="relative min-h-screen flex items-center py-32 bg-brand-background"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary-bg mb-8"
          >
            <Zap className="w-10 h-10 text-brand-primary" />
          </motion.div>

          <AnimatedText
            text="A Solução"
            animation="words"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-text mb-4"
          />
          <AnimatedText
            text="Que Transforma"
            animation="words"
            delay={0.3}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-primary mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-brand-text-secondary max-w-2xl mx-auto"
          >
            Tecnologia de ponta desenvolvida para empresas que buscam
            eficiência real e resultados mensuráveis.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card tilt className="h-full group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                    <solution.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-text mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-brand-text-secondary">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-brand-surface border border-brand-primary/10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-brand-primary-soft border-2 border-brand-background"
                />
              ))}
            </div>
            <span className="text-sm text-brand-text-secondary">
              <span className="text-brand-primary font-semibold">+150</span> empresas já transformadas
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
