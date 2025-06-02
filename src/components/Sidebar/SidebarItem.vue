<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li :class="clsx(['w-auto h-auto', props.class])">
    <slot />
  </li>
</template>
