<script setup lang="ts">
import { useBingo } from '@/composables/useBingo'
import { computed } from 'vue'

const { cells, hasWon, winningPattern, toggleCell } = useBingo()

const winningCells = computed(() => {
  return new Set(winningPattern.value?.cells ?? [])
})
</script>

<template>
  <Card class="p-4 sm:p-6 md:p-8">
    <div class="relative">
      <!-- Win overlay -->
      <Transition
        enter-active-class="transition-all duration-500"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
      >
        <div
          v-if="hasWon"
          class="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm"
        >
          <div class="animate-bounce-in text-center">
            <div class="mb-4 text-6xl">🎉</div>
            <h2 class="text-3xl font-bold text-primary">BINGO!</h2>
            <p class="mt-2 text-muted-foreground">You won!</p>
          </div>
        </div>
      </Transition>

      <!-- Bingo grid -->
      <div class="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        <TransitionGroup
          appear
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-75"
          enter-to-class="opacity-100 scale-100"
        >
          <BingoCell
            v-for="(cell, index) in cells"
            :key="cell.id"
            :cell="cell"
            :is-winning="winningCells.has(cell.id)"
            :disabled="hasWon"
            :style="{ transitionDelay: `${index * 20}ms` }"
            @toggle="toggleCell"
          />
        </TransitionGroup>
      </div>
    </div>
  </Card>
</template>
