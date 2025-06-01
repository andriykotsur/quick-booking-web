<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant: 'rectangle' | 'circle' | 'pill'
}>()
</script>

<template>
  <div
    :class="
      clsx([
        'bg-neutral-700 animate-pulse',
        {
          rounded: props.variant === 'rectangle',
          'rounded-xl': props.variant === 'pill',
          'rounded-full': props.variant === 'circle',
        },
        props.class,
      ])
    "
  ></div>
</template>
