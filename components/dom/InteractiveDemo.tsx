'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Input } from '@heroui/react'
import { MessageSquare, Send, Bot, User } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useStore } from '@/hooks/useStore'

const demoMessages = [
  { role: 'bot', content: 'Olá! Sou o assistente virtual da ALMA. Como posso ajudar?' },
  { role: 'user', content: 'Quero saber sobre planos de automação' },
  { role: 'bot', content: 'Ótimo! Temos 3 planos principais: Starter, Business e Enterprise. Qual o tamanho da sua operação?' },
]

const quickActions = [
  'Ver planos disponíveis',
  'Agendar demonstração',
  'Falar com consultor',
  'Calcular ROI',
]

export function InteractiveDemo() {
  const ref = useRef<HTMLElement>(null)
  const [messages, setMessages] = useState(demoMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const setScene = useStore((state) => state.setScene)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    setIsTyping(true)

    setScene({ primaryColor: '#00FF9D' })

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: 'Entendi! Vou preparar uma proposta personalizada para você. Enquanto isso, explore nossa calculadora de ROI logo abaixo.',
        },
      ])
      setIsTyping(false)
      setScene({ primaryColor: '#00E5FF' })
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    setMessages([...messages, { role: 'user', content: action }])
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: `Perfeito! Processando: "${action}". Nossa equipe vai entrar em contato em breve.`,
        },
      ])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <section
      ref={ref}
      id="demo"
      className="relative min-h-screen flex items-center py-32"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
      >
        <div className="text-center mb-16">
          <AnimatedText
            text="Experimente Agora"
            animation="words"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-text mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-brand-muted max-w-2xl mx-auto"
          >
            Interaja com nosso assistente e veja a IA em ação.
            O visual 3D reage às suas interações em tempo real.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-[500px] flex flex-col">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text">Chat Demo</h3>
                  <p className="text-xs text-brand-muted">Assistente ALMA</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'bot'
                          ? 'bg-brand-primary/20'
                          : 'bg-brand-secondary/20'
                      }`}
                    >
                      {msg.role === 'bot' ? (
                        <Bot className="w-4 h-4 text-brand-primary" />
                      ) : (
                        <User className="w-4 h-4 text-brand-secondary" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                        msg.role === 'bot'
                          ? 'bg-brand-surface text-brand-text'
                          : 'bg-brand-primary text-brand-dark'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div className="px-4 py-2 rounded-2xl bg-brand-surface">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-brand-muted"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex gap-2 items-center">
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Digite sua mensagem..."
                    variant="bordered"
                    radius="lg"
                    classNames={{
                      base: "flex-1",
                      inputWrapper: "bg-brand-surface border-white/10 hover:border-brand-primary/50 focus-within:border-brand-primary data-[hover=true]:bg-brand-surface group-data-[focus=true]:bg-brand-surface",
                      input: "text-brand-text placeholder:text-brand-muted",
                    }}
                  />
                  <Button onClick={handleSend} className="!p-3 h-12">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <h3 className="text-xl font-semibold text-brand-text mb-4">
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="p-3 rounded-xl bg-brand-surface hover:bg-brand-primary/10 border border-white/10 hover:border-brand-primary/50 text-sm text-brand-text transition-all text-left"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-brand-text mb-4">
                Capacidades do Agente
              </h3>
              <ul className="space-y-3">
                {[
                  'Respostas em menos de 1 segundo',
                  'Atendimento em múltiplos idiomas',
                  'Integração com CRM e ERP',
                  'Escalonamento inteligente',
                  'Análise de sentimento em tempo real',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-brand-muted"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
