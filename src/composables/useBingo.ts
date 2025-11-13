import { useStorage } from '@vueuse/core'
import wordsData from '../../words.json'

export interface BingoCell {
  id: number
  text: string
  checked: boolean
}

export type WinPattern = 'row' | 'column' | 'diagonal-left' | 'diagonal-right'

export interface WinInfo {
  pattern: WinPattern
  cells: number[]
}

export function useBingo() {
  const wins = useStorage('obs-bingo-wins', 0)
  const hasWon = useStorage('obs-bingo-has-won', false)
  const cells = useStorage<BingoCell[]>('obs-bingo-cells', [])
  const winningPattern = useStorage<WinInfo | null>('obs-bingo-winning-pattern', null)

  // Initialize or load game
  if (cells.value.length === 0) {
    initializeBoard()
  }

  function initializeBoard() {
    // Shuffle and take 25 random words
    const shuffled = [...wordsData].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 25)

    cells.value = selected.map((text, index) => ({
      id: index,
      text,
      checked: false,
    }))
  }

  function toggleCell(id: number) {
    if (hasWon.value) return

    const cell = cells.value.find(c => c.id === id)
    if (cell) {
      cell.checked = !cell.checked
      checkWinCondition()
    }
  }

  function checkForWin(): WinInfo | null {
    // Check rows
    for (let row = 0; row < 5; row++) {
      const rowCells = Array.from({ length: 5 }, (_, col) => row * 5 + col)
      if (rowCells.every(id => cells.value[id].checked)) {
        return { pattern: 'row', cells: rowCells }
      }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      const colCells = Array.from({ length: 5 }, (_, row) => row * 5 + col)
      if (colCells.every(id => cells.value[id].checked)) {
        return { pattern: 'column', cells: colCells }
      }
    }

    // Check diagonal (top-left to bottom-right)
    const diagonal1 = [0, 6, 12, 18, 24]
    if (diagonal1.every(id => cells.value[id].checked)) {
      return { pattern: 'diagonal-left', cells: diagonal1 }
    }

    // Check diagonal (top-right to bottom-left)
    const diagonal2 = [4, 8, 12, 16, 20]
    if (diagonal2.every(id => cells.value[id].checked)) {
      return { pattern: 'diagonal-right', cells: diagonal2 }
    }

    return null
  }

  function checkWinCondition() {
    if (hasWon.value) return

    const winInfo = checkForWin()
    if (winInfo) {
      hasWon.value = true
      winningPattern.value = winInfo
      wins.value++
      return true
    }
    return false
  }

  function resetBoard() {
    hasWon.value = false
    winningPattern.value = null
    initializeBoard()
  }

  function resetWins() {
    wins.value = 0
  }

  return {
    cells,
    wins,
    hasWon,
    winningPattern,
    toggleCell,
    resetBoard,
    resetWins,
  }
}
