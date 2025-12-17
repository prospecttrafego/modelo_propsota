import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, locale = 'pt-BR', currency = 'BRL'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number, locale = 'pt-BR'): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
): number {
  return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin
}

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3)
}

export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export function scrambleText(
  text: string,
  progress: number,
  chars = '!<>-_\\/[]{}—=+*^?#________'
): string {
  const length = text.length
  const revealedCount = Math.floor(length * progress)

  return text
    .split('')
    .map((char, i) => {
      if (i < revealedCount) return char
      if (char === ' ') return ' '
      return chars[Math.floor(Math.random() * chars.length)]
    })
    .join('')
}

export function debounce<Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  wait: number
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  limit: number
): (...args: Args) => void {
  let inThrottle = false

  return (...args: Args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
