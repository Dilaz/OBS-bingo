import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useBingo } from '../useBingo'

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

describe('useBingo', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should initialize with 25 cells', () => {
    const { cells } = useBingo()
    expect(cells.value).toHaveLength(25)
  })

  it('should initialize all cells as unchecked', () => {
    const { cells } = useBingo()
    expect(cells.value.every(cell => !cell.checked)).toBe(true)
  })

  it('should toggle cell checked state', () => {
    const { cells, toggleCell } = useBingo()
    const cellId = cells.value[0].id

    expect(cells.value[0].checked).toBe(false)
    toggleCell(cellId)
    expect(cells.value[0].checked).toBe(true)
    toggleCell(cellId)
    expect(cells.value[0].checked).toBe(false)
  })

  it('should detect horizontal win', () => {
    const { cells, toggleCell, hasWon } = useBingo()

    // Check first row (cells 0-4)
    for (let i = 0; i < 5; i++) {
      toggleCell(cells.value[i].id)
    }

    expect(hasWon.value).toBe(true)
  })

  it('should detect vertical win', () => {
    const { cells, toggleCell, hasWon } = useBingo()

    // Check first column (cells 0, 5, 10, 15, 20)
    for (let i = 0; i < 5; i++) {
      toggleCell(cells.value[i * 5].id)
    }

    expect(hasWon.value).toBe(true)
  })

  it('should detect diagonal win (top-left to bottom-right)', () => {
    const { cells, toggleCell, hasWon } = useBingo()

    // Check diagonal (cells 0, 6, 12, 18, 24)
    const diagonalIndices = [0, 6, 12, 18, 24]
    diagonalIndices.forEach(index => {
      toggleCell(cells.value[index].id)
    })

    expect(hasWon.value).toBe(true)
  })

  it('should detect diagonal win (top-right to bottom-left)', () => {
    const { cells, toggleCell, hasWon } = useBingo()

    // Check diagonal (cells 4, 8, 12, 16, 20)
    const diagonalIndices = [4, 8, 12, 16, 20]
    diagonalIndices.forEach(index => {
      toggleCell(cells.value[index].id)
    })

    expect(hasWon.value).toBe(true)
  })

  it('should increment wins counter on win', () => {
    const { cells, toggleCell, wins } = useBingo()

    expect(wins.value).toBe(0)

    // Win by completing first row
    for (let i = 0; i < 5; i++) {
      toggleCell(cells.value[i].id)
    }

    expect(wins.value).toBe(1)
  })

  it('should not allow toggling cells after winning', () => {
    const { cells, toggleCell, hasWon } = useBingo()

    // Win by completing first row
    for (let i = 0; i < 5; i++) {
      toggleCell(cells.value[i].id)
    }

    expect(hasWon.value).toBe(true)

    // Try to uncheck a cell
    const firstCell = cells.value[0]
    const wasChecked = firstCell.checked
    toggleCell(firstCell.id)

    // Cell should remain checked
    expect(cells.value[0].checked).toBe(wasChecked)
  })

  it('should reset board and keep wins', () => {
    const { cells, toggleCell, resetBoard, wins, hasWon } = useBingo()

    // Win a game
    for (let i = 0; i < 5; i++) {
      toggleCell(cells.value[i].id)
    }

    expect(wins.value).toBe(1)
    expect(hasWon.value).toBe(true)

    resetBoard()

    expect(hasWon.value).toBe(false)
    expect(wins.value).toBe(1) // Wins should persist
    expect(cells.value.every(cell => !cell.checked)).toBe(true)
    // Board should be reshuffled (very likely different)
    // Note: This could theoretically fail if the shuffle results in the same first cell
  })

  it('should reset wins counter', () => {
    const { cells, toggleCell, resetWins, wins } = useBingo()

    // Win a game
    for (let i = 0; i < 5; i++) {
      toggleCell(cells.value[i].id)
    }

    expect(wins.value).toBe(1)
    resetWins()
    expect(wins.value).toBe(0)
  })

  it('should provide winning pattern info', () => {
    const { cells, toggleCell, winningPattern } = useBingo()

    expect(winningPattern.value).toBeNull()

    // Complete first row
    for (let i = 0; i < 5; i++) {
      toggleCell(cells.value[i].id)
    }

    expect(winningPattern.value).not.toBeNull()
    expect(winningPattern.value?.pattern).toBe('row')
    expect(winningPattern.value?.cells).toEqual([0, 1, 2, 3, 4])
  })
})
