<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title?: string
}>()
</script>

<template>
  <header :class="clsx(['w-full h-auto', props.class])">
    <h3 v-if="props.title" class="font-bold text-xl text-white">{{ props.title }}</h3>
    <slot />
  </header>
</template>
