<script setup lang="ts">
import { clsx } from 'clsx'
import type { HTMLAttributes } from 'vue'

import { Layout } from '@/components/UI'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Layout
    :class="
      clsx([
        'p-8 w-screen h-screen flex flex-col justify-center items-center bg-neutral-900',
        props.class,
      ])
    "
  >
    <section class="max-w-xl w-full">
      <slot />
    </section>
  </Layout>
</template>
