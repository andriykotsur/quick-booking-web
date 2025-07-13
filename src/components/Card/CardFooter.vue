<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <footer :class="clsx(['mt-auto w-full h-auto', props.class])">
    <slot />
  </footer>
</template>
