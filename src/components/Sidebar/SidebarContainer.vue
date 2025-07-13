<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

import { useUIStore } from '@/stores/ui'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const uiStore = useUIStore()
</script>

<template>
  <aside
    :class="
      clsx([
        'relative p-8 w-full h-full flex flex-col gap-y-4 bg-neutral-800 transition-[max-width] duration-300',
        uiStore.isSidebarOpen ? 'max-w-96' : 'max-w-32',
        props.class,
      ])
    "
  >
    <slot />
  </aside>
</template>
