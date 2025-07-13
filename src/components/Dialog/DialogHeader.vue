<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'
import { DialogTitle } from 'reka-ui'
import type { DialogTitleProps } from 'reka-ui'

const props = defineProps<
  {
    class?: HTMLAttributes['class']
    title?: string
  } & DialogTitleProps
>()
</script>

<template>
  <header :class="clsx(['flex gap-2', props.class])">
    <DialogTitle v-if="props.title" class="font-bold text-xl text-black">{{
      props.title
    }}</DialogTitle>
    <slot />
  </header>
</template>
