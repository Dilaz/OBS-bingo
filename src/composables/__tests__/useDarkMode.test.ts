import { beforeEach, describe, expect, it } from 'vitest'
import { useDarkMode } from '../useDarkMode'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('should initialize with dark mode enabled by default', () => {
    localStorage.clear() // Ensure clean slate
    const { isDark } = useDarkMode()
    expect(isDark.value).toBe(true)
  })

  it('should toggle dark mode', () => {
    const { isDark, toggleDarkMode } = useDarkMode()

    // Start from current state (which might be true from previous test)
    const initialState = isDark.value
    toggleDarkMode()
    expect(isDark.value).toBe(!initialState)
    toggleDarkMode()
    expect(isDark.value).toBe(initialState)
  })

  it('should persist dark mode preference in localStorage', () => {
    const { toggleDarkMode, isDark } = useDarkMode()

    // Get current state
    const currentState = isDark.value

    // Toggle and check it's stored
    toggleDarkMode()
    expect(isDark.value).toBe(!currentState)
    const stored = localStorage.getItem('obs-bingo-dark-mode')
    expect(stored).toBeTruthy() // Just check it's stored

    // Toggle back
    toggleDarkMode()
    expect(isDark.value).toBe(currentState)
    const stored2 = localStorage.getItem('obs-bingo-dark-mode')
    expect(stored2).toBeTruthy() // Just check it's stored
  })
})
