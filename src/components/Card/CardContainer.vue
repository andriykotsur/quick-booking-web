<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="clsx(['relative flex flex-col gap-y-2 rounded overflow-hidden', props.class])">
    <slot />
  </div>
</template>
