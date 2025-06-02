<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ul :class="clsx(['p-0 m-0 w-full flex flex-col gap-y-2 list-none', props.class])">
    <slot />
  </ul>
</template>
