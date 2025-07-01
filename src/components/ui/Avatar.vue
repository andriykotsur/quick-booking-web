<script setup lang="ts">
import { clsx } from 'clsx'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  image: {
    source: string
    alt: string
  }
  size: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <AvatarRoot
    :class="
      clsx([
        'flex shrink-0 items-center justify-center align-middle select-none rounded-md overflow-hidden',
        {
          'w-8 h-8': props.size === 'sm',
          'w-12 h-12': props.size === 'md',
          'w-16 h-16': props.size === 'lg',
        },
        props.class,
      ])
    "
  >
    <AvatarImage
      class="h-full w-full rounded-[inherit] object-cover"
      :src="props.image?.source"
      :alt="props.image?.alt"
    />
    <AvatarFallback
      class="h-full w-full flex items-center justify-center leading-1 bg-white text-black font-medium"
      :delay-ms="250"
    >
      CT
    </AvatarFallback>
  </AvatarRoot>
</template>
