<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { BingoCell } from '@/composables/useBingo'

interface Props {
  cell: BingoCell
  isWinning?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isWinning: false,
  disabled: false,
})

const emit = defineEmits<{
  toggle: [id: number]
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('toggle', props.cell.id)
  }
}
</script>

<template>
  <button
    :class="
      cn(
        'group relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all duration-300',
        'flex items-center justify-center p-2 text-xs sm:text-sm md:text-base',
        'hover:scale-105 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        {
          'border-border bg-card hover:bg-accent/50': !cell.checked && !isWinning,
          'border-primary bg-primary/20 hover:bg-primary/30': cell.checked && !isWinning,
          'border-green-500 bg-green-500/30 animate-celebrate': isWinning,
          'cursor-not-allowed opacity-75': disabled,
        }
      )
    "
    :disabled="disabled"
    @click="handleClick"
  >
    <span
      :class="
        cn('text-center font-medium transition-all duration-300', {
          'text-foreground': !cell.checked,
          'text-primary-foreground font-semibold': cell.checked,
        })
      "
    >
      {{ cell.text }}
    </span>

    <!-- Checkmark overlay -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 scale-50"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-50"
    >
      <div
        v-if="cell.checked"
        class="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-[1px]"
      >
        <svg
          class="h-8 w-8 text-primary drop-shadow-lg sm:h-10 sm:w-10 md:h-12 md:w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </Transition>
  </button>
</template>
