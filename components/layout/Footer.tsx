'use client'

import { motion } from 'framer-motion'
import { Linkedin, Instagram, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-brand-primary/10 bg-brand-surface-light">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <motion.a
              href="#hero"
              className="inline-block mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/Logo Principal-07.png"
                alt="convert A.I"
                width={300}
                height={177}
                className="h-24 w-auto"
              />
            </motion.a>
            <p className="text-brand-text-secondary max-w-md mb-6">
              Transformamos operações através de atendimento personalizado
              e agentes de IA de última geração.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Mail, href: 'mailto:contato@convertai.com.br' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center text-brand-text-secondary hover:text-brand-primary hover:bg-brand-primary-bg transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-brand-text mb-4">Soluções</h4>
            <ul className="space-y-3">
              {['Agentes de IA', 'Automação', 'Dashboards', 'Integrações'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-brand-text-secondary hover:text-brand-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-text mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-brand-text-secondary">
                <Mail className="w-4 h-4" />
                contato@convertai.com.br
              </li>
              <li className="flex items-start gap-2 text-brand-text-secondary">
                <MapPin className="w-4 h-4 mt-1" />
                <span>
                  São Paulo, Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-text-secondary">
            {new Date().getFullYear()} convert A.I. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-brand-text-secondary">
            <a href="#" className="hover:text-brand-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-brand-primary transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
