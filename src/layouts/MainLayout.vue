<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'

import { Avatar, Layout } from '@/components/ui'

import { useUserStore } from '@/stores/user'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const userStore = useUserStore()
</script>

<template>
  <Layout :class="clsx(['w-screen h-screen flex bg-neutral-900', props.class])">
    <aside class="p-8 max-w-96 w-full h-full bg-neutral-800">Navigation</aside>

    <div class="p-8 w-full h-full">
      <header class="flex justify-between items-center gap-x-4">
        <h1 class="font-bold text-4xl text-white">Dashboard</h1>
        <aside
          class="max-w-80 w-full p-4 flex justify-between items-center gap-x-8 bg-neutral-800 rounded-xl"
        >
          <div class="flex flex-col gap-y-1">
            <h3 class="font-medium text-white">{{ userStore.user?.name ?? 'N/A' }}</h3>
            <span class="text-sm text-white">{{ userStore.user?.email ?? 'N/A' }}</span>
          </div>

          <Avatar :image="{ source: '', alt: '' }" size="md" />
        </aside>
      </header>

      <slot />
    </div>
  </Layout>
</template>
