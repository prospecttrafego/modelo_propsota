import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'convert A.I | Proposta Comercial 2026 - Atendimento Personalizado com IA',
  description: 'Proposta comercial interativa para serviços de automação com IA. Agentes inteligentes de atendimento, CRM, dashboards e muito mais.',
  keywords: ['IA', 'Automação', 'Agentes de IA', 'CRM', 'Dashboard', 'Inteligência Artificial', 'Atendimento', 'convert A.I'],
  authors: [{ name: 'convert A.I' }],
  openGraph: {
    title: 'convert A.I | Proposta Comercial 2026',
    description: 'Atendimento personalizado com inteligência artificial.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#013117',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="light">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
