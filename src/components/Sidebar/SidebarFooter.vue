<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <footer :class="clsx(['relative mt-auto w-full flex items-center', props.class])">
    <slot />
  </footer>
</template>
