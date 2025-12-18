'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useStore } from '@/hooks/useStore'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Solução', href: '#solution' },
  { label: 'Demo', href: '#demo' },
  { label: 'ROI', href: '#roi' },
  { label: 'Preços', href: '#pricing' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isMenuOpen } = useStore((state) => state.ui)
  const toggleMenu = useStore((state) => state.toggleMenu)
  const isLoading = useStore((state) => state.ui.isLoading)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    if (isMenuOpen) toggleMenu()
  }

  if (isLoading) return null

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled ? 'glass-strong py-3' : 'py-6'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src="/Logo Principal-07.png"
              alt="convert A.I"
              width={160}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="text-sm text-brand-text-secondary hover:text-brand-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="primary" size="sm">
              Falar com Consultor
            </Button>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-brand-text"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <div
              className="absolute inset-0 bg-brand-text/20 backdrop-blur-lg"
              onClick={toggleMenu}
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-brand-background p-8 pt-24 shadow-2xl"
            >
              <div className="space-y-6">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="block text-2xl font-display text-brand-text hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12"
              >
                <Button variant="primary" className="w-full">
                  Falar com Consultor
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
