<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title: string
  description?: string
}>()
</script>

<template>
  <div :class="clsx(['relative flex flex-col gap-y-2 rounded overflow-hidden', props.class])">
    <header v-if="props.title" class="w-full h-auto">
      <h3 class="text-xl text-white font-bold">{{ props.title }}</h3>
    </header>
    <div v-if="props.description" class="w-full h-auto">
      <p class="text-white font-bold opacity-50">{{ props.description }}</p>
    </div>
    <slot />
  </div>
</template>
