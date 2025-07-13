<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <footer :class="clsx(['flex flex-wrap justify-end gap-2', props.class])">
    <slot />
  </footer>
</template>
