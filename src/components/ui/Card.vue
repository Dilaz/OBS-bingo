<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, as, ...delegated } = props
  return delegated
})
</script>

<template>
  <component
    :is="as"
    :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </component>
</template>
