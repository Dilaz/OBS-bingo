import { useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

export function useDarkMode() {
  const isDark = useStorage('obs-bingo-dark-mode', true)

  watchEffect(() => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  function toggleDarkMode() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleDarkMode,
  }
}
