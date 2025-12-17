import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'ALMA | Proposta Comercial 2026 - Automação com IA',
  description: 'Proposta comercial interativa para serviços de automação com IA. Agentes inteligentes, CRM, dashboards e muito mais.',
  keywords: ['IA', 'Automação', 'Agentes de IA', 'CRM', 'Dashboard', 'Inteligência Artificial'],
  authors: [{ name: 'ALMA' }],
  openGraph: {
    title: 'ALMA | Proposta Comercial 2026',
    description: 'O futuro da sua operação começa aqui.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
        <div className="noise-overlay" />
      </body>
    </html>
  )
}
