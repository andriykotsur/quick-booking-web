<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <aside
    :class="
      clsx([
        'relative p-8 max-w-96 w-full h-full flex flex-col gap-y-4 bg-neutral-800',
        props.class,
      ])
    "
  >
    <slot />
  </aside>
</template>
