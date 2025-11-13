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

    // Get the initial state
    const initialValue = isDark.value

    // Toggle and verify the value changed and is stored
    toggleDarkMode()
    expect(isDark.value).toBe(!initialValue)
    expect(localStorage.getItem('obs-bingo-dark-mode')).toBeTruthy()

    // Toggle back and verify
    toggleDarkMode()
    expect(isDark.value).toBe(initialValue)
    expect(localStorage.getItem('obs-bingo-dark-mode')).toBeTruthy()
  })
})
