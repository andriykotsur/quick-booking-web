<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  description?: string
}>()
</script>

<template>
  <div :class="clsx(['w-full h-auto', props.class])">
    <p v-if="props.description" class="font-bold text-white opacity-50">{{ props.description }}</p>
    <slot />
  </div>
</template>
