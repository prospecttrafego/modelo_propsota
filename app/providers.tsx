'use client'

import { HeroUIProvider } from '@heroui/react'
import { ReactNode } from 'react'
import { SmoothScrollWrapper } from '@/components/layout/SmoothScrollWrapper'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <SmoothScrollWrapper>
        {children}
      </SmoothScrollWrapper>
    </HeroUIProvider>
  )
}
