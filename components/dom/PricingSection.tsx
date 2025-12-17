'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

const plans = [
  {
    name: 'Starter',
    description: 'Para empresas iniciando sua jornada de automação',
    price: 2997,
    period: '/mês',
    features: [
      '1 Agente de IA',
      'Até 1.000 interações/mês',
      'Dashboard básico',
      'Suporte por email',
      'Integrações essenciais',
    ],
    cta: 'Começar Agora',
    popular: false,
  },
  {
    name: 'Business',
    description: 'Para operações que precisam escalar',
    price: 5997,
    period: '/mês',
    features: [
      '5 Agentes de IA',
      'Até 10.000 interações/mês',
      'Dashboard avançado',
      'Suporte prioritário',
      'Todas as integrações',
      'Workflows personalizados',
      'Relatórios detalhados',
    ],
    cta: 'Escolher Business',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Solução completa para grandes operações',
    price: null,
    period: 'Personalizado',
    features: [
      'Agentes ilimitados',
      'Interações ilimitadas',
      'Dashboard white-label',
      'Suporte dedicado 24/7',
      'Integrações customizadas',
      'SLA garantido',
      'Treinamento presencial',
      'Gerente de sucesso',
    ],
    cta: 'Falar com Vendas',
    popular: false,
  },
]

export function PricingSection() {
  const ref = useRef<HTMLElement>(null)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative min-h-screen flex items-center py-32"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
      >
        <div className="text-center mb-16">
          <AnimatedText
            text="Investimento"
            animation="words"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-text mb-4"
          />
          <AnimatedText
            text="Transparente"
            animation="words"
            delay={0.3}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text text-glow-primary mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-brand-muted max-w-2xl mx-auto"
          >
            Escolha o plano ideal para sua operação.
            Todos incluem setup gratuito e garantia de satisfação.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <Card
                tilt
                glow
                className={`h-full flex flex-col relative ${
                  plan.popular ? 'border-brand-primary/50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary text-brand-dark text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6 pt-4">
                  <h3 className="text-2xl font-display font-bold text-brand-text mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-brand-muted mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price ? (
                      <>
                        <span className="text-4xl font-bold text-brand-text">
                          {formatCurrency(plan.price)}
                        </span>
                        <span className="text-brand-muted">{plan.period}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-brand-text">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: hoveredPlan === plan.name || plan.popular ? 1 : 0.7,
                        x: 0,
                      }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-brand-primary" />
                      </div>
                      <span className="text-sm text-brand-muted">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  magnetic
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="inline-flex items-center gap-4 px-6 py-4">
            <div className="text-left">
              <p className="text-sm text-brand-muted">Precisa de algo específico?</p>
              <p className="text-brand-text font-semibold">
                Montamos uma proposta sob medida para você
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Falar com especialista
            </Button>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
