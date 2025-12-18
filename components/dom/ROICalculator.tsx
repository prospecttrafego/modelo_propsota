'use client'

import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Card } from '@/components/ui/Card'
import { Slider } from '@/components/ui/Slider'
import { useStore, useROI } from '@/hooks/useStore'
import { formatCurrency, formatNumber } from '@/lib/utils'

export function ROICalculator() {
  const ref = useRef<HTMLElement>(null)
  const roi = useROI()
  const setROI = useStore((state) => state.setROI)
  const setScene = useStore((state) => state.setScene)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const calculations = useMemo(() => {
    const monthlyHours = roi.employees * roi.hoursPerWeek * 4
    const monthlyCost = monthlyHours * roi.hourlyRate
    const automatedHours = monthlyHours * (roi.automationPercent / 100)
    const monthlySavings = automatedHours * roi.hourlyRate
    const yearlySavings = monthlySavings * 12
    const paybackMonths = 15000 / monthlySavings

    return {
      monthlyHours,
      monthlyCost,
      automatedHours,
      monthlySavings,
      yearlySavings,
      paybackMonths: Math.max(0.5, Math.min(paybackMonths, 24)),
    }
  }, [roi])

  const handleSliderChange = (key: keyof typeof roi) => (value: number) => {
    setROI({ [key]: value })

    const intensity = 0.5 + (value / 100) * 1.5
    setScene({ bloomIntensity: Math.min(intensity, 2) })
  }

  return (
    <section
      ref={ref}
      id="roi"
      className="relative min-h-screen flex items-center py-32 bg-brand-background"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary-bg mb-8"
          >
            <Calculator className="w-10 h-10 text-brand-primary" />
          </motion.div>

          <AnimatedText
            text="Calculadora de ROI"
            animation="words"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-text mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-brand-text-secondary max-w-2xl mx-auto"
          >
            Descubra quanto sua empresa pode economizar com automação.
            Ajuste os valores e veja o impacto em tempo real.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="space-y-8">
              <h3 className="text-xl font-semibold text-brand-text">
                Configure seus dados
              </h3>

              <Slider
                label="Funcionários envolvidos"
                min={1}
                max={100}
                value={roi.employees}
                onChange={handleSliderChange('employees')}
                unit="pessoas"
              />

              <Slider
                label="Horas semanais em processos manuais"
                min={1}
                max={40}
                value={roi.hoursPerWeek}
                onChange={handleSliderChange('hoursPerWeek')}
                unit="h/semana"
              />

              <Slider
                label="Custo médio por hora"
                min={20}
                max={200}
                step={5}
                value={roi.hourlyRate}
                onChange={handleSliderChange('hourlyRate')}
                formatValue={(v) => formatCurrency(v)}
                unit="/hora"
              />

              <Slider
                label="Potencial de automação"
                min={20}
                max={90}
                step={5}
                value={roi.automationPercent}
                onChange={handleSliderChange('automationPercent')}
                formatValue={(v) => `${v}%`}
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="border-2 border-brand-primary/20">
              <div className="text-center">
                <p className="text-sm text-brand-text-secondary mb-2">
                  Economia Anual Estimada
                </p>
                <motion.p
                  key={calculations.yearlySavings}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-5xl md:text-6xl font-display font-bold text-brand-primary"
                >
                  {formatCurrency(calculations.yearlySavings)}
                </motion.p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-brand-primary/10">
                    <DollarSign className="w-5 h-5 text-brand-primary" />
                  </div>
                  <span className="text-sm text-brand-text-secondary">Economia Mensal</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">
                  {formatCurrency(calculations.monthlySavings)}
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-brand-primary-light/10">
                    <Clock className="w-5 h-5 text-brand-primary-light" />
                  </div>
                  <span className="text-sm text-brand-text-secondary">Horas Liberadas</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">
                  {formatNumber(Math.round(calculations.automatedHours))}h/mês
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-brand-primary-soft/30">
                    <TrendingUp className="w-5 h-5 text-brand-primary" />
                  </div>
                  <span className="text-sm text-brand-text-secondary">Payback</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">
                  {calculations.paybackMonths.toFixed(1)} meses
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-brand-primary-bg">
                    <Calculator className="w-5 h-5 text-brand-primary" />
                  </div>
                  <span className="text-sm text-brand-text-secondary">ROI em 12 meses</span>
                </div>
                <p className="text-2xl font-bold text-brand-text">
                  {Math.round((calculations.yearlySavings / 15000 - 1) * 100)}%
                </p>
              </Card>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-xs text-brand-muted text-center"
            >
              * Valores estimados com base nos dados informados.
              Resultados reais podem variar.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
