<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <header :class="clsx(['relative w-full flex items-center', props.class])">
    <slot />
  </header>
</template>
