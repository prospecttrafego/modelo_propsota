'use client'

import { create } from 'zustand'

interface ScrollState {
  progress: number
  velocity: number
  direction: 'up' | 'down' | null
}

interface MouseState {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

interface UIState {
  isLoading: boolean
  loadingProgress: number
  currentSection: number
  isMenuOpen: boolean
  activeModal: string | null
}

interface SceneState {
  intensity: number
  bloomIntensity: number
  primaryColor: string
  secondaryColor: string
  cameraPosition: [number, number, number]
  targetRotation: [number, number, number]
}

interface ROIState {
  employees: number
  hoursPerWeek: number
  hourlyRate: number
  automationPercent: number
}

interface Store {
  scroll: ScrollState
  mouse: MouseState
  ui: UIState
  scene: SceneState
  roi: ROIState

  setScroll: (scroll: Partial<ScrollState>) => void
  setMouse: (mouse: Partial<MouseState>) => void
  setUI: (ui: Partial<UIState>) => void
  setScene: (scene: Partial<SceneState>) => void
  setROI: (roi: Partial<ROIState>) => void

  setLoadingComplete: () => void
  setCurrentSection: (section: number) => void
  toggleMenu: () => void
  openModal: (modalId: string) => void
  closeModal: () => void
}

export const useStore = create<Store>((set) => ({
  scroll: {
    progress: 0,
    velocity: 0,
    direction: null,
  },

  mouse: {
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  },

  ui: {
    isLoading: true,
    loadingProgress: 0,
    currentSection: 0,
    isMenuOpen: false,
    activeModal: null,
  },

  scene: {
    intensity: 1,
    bloomIntensity: 1.2,
    primaryColor: '#013117',
    secondaryColor: '#486D4E',
    cameraPosition: [0, 0, 5],
    targetRotation: [0, 0, 0],
  },

  roi: {
    employees: 10,
    hoursPerWeek: 20,
    hourlyRate: 50,
    automationPercent: 60,
  },

  setScroll: (scroll) =>
    set((state) => ({ scroll: { ...state.scroll, ...scroll } })),

  setMouse: (mouse) =>
    set((state) => ({ mouse: { ...state.mouse, ...mouse } })),

  setUI: (ui) =>
    set((state) => ({ ui: { ...state.ui, ...ui } })),

  setScene: (scene) =>
    set((state) => ({ scene: { ...state.scene, ...scene } })),

  setROI: (roi) =>
    set((state) => ({ roi: { ...state.roi, ...roi } })),

  setLoadingComplete: () =>
    set((state) => ({
      ui: { ...state.ui, isLoading: false, loadingProgress: 100 },
    })),

  setCurrentSection: (section) =>
    set((state) => ({
      ui: { ...state.ui, currentSection: section },
    })),

  toggleMenu: () =>
    set((state) => ({
      ui: { ...state.ui, isMenuOpen: !state.ui.isMenuOpen },
    })),

  openModal: (modalId) =>
    set((state) => ({
      ui: { ...state.ui, activeModal: modalId },
    })),

  closeModal: () =>
    set((state) => ({
      ui: { ...state.ui, activeModal: null },
    })),
}))

export const useScrollProgress = () => useStore((state) => state.scroll.progress)
export const useCurrentSection = () => useStore((state) => state.ui.currentSection)
export const useIsLoading = () => useStore((state) => state.ui.isLoading)
export const useROI = () => useStore((state) => state.roi)
export const useSceneSettings = () => useStore((state) => state.scene)
