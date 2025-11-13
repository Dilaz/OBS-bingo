<script setup lang="ts">
import { useBingo } from './composables/useBingo'
import { useDarkMode } from './composables/useDarkMode'

const { wins, resetBoard, resetWins } = useBingo()
const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4 sm:p-6 md:p-8">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <header class="mb-8 text-center">
        <div class="mb-4 flex items-center justify-center gap-2">
          <h1
            class="animate-bounce-in text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            OBS Bingo
          </h1>
          <Button
            variant="ghost"
            size="icon"
            @click="toggleDarkMode"
            class="ml-4"
            aria-label="Toggle dark mode"
          >
            <Moon v-if="!isDark" class="h-5 w-5" />
            <Sun v-else class="h-5 w-5" />
          </Button>
        </div>
        <p class="text-muted-foreground">The ultimate bingo game for OBS support enthusiasts!</p>
      </header>

      <!-- Bingo Board -->
      <div class="mb-8">
        <BingoBoard />
      </div>

      <!-- Stats and Controls -->
      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
        <!-- Wins Counter -->
        <div
          class="flex items-center gap-2 rounded-lg border bg-card px-6 py-3 shadow-sm transition-all hover:shadow-md"
        >
          <Trophy class="h-5 w-5 text-yellow-500" />
          <span class="text-lg font-semibold">Wins:</span>
          <span class="text-2xl font-bold text-primary">{{ wins }}</span>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <Button variant="outline" @click="resetBoard" class="gap-2">
            <RotateCcw class="h-4 w-4" />
            New Game
          </Button>
          <Button variant="destructive" @click="resetWins"> Reset Wins </Button>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-12 text-center text-sm text-muted-foreground">
        <p>Click cells to mark them. Get 5 in a row (horizontal, vertical, or diagonal) to win!</p>
      </footer>
    </div>
  </div>
</template>
