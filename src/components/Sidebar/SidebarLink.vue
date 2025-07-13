<script setup lang="ts">
import { clsx } from 'clsx'
import { computed } from 'vue'
import type { HTMLAttributes, Component } from 'vue'
import { useRoute } from 'vue-router'

import { useUIStore } from '@/stores/ui'

const props = defineProps<{
  class?: HTMLAttributes['class']
  icon?: Component
  name: string
  slug: string
}>()

const route = useRoute()
const uiStore = useUIStore()

const isActive = computed(() => route.path === props.slug)
</script>

<template>
  <RouterLink
    :to="props.slug"
    :class="
      clsx([
        'px-4 py-4 flex items-center gap-4 rounded-md transition duration-300 ease-in-out',
        isActive ? 'bg-white hover:bg-white' : 'bg-transparent hover:bg-neutral-900',
        props.class,
      ])
    "
  >
    <component
      v-if="props.icon"
      :is="props.icon"
      :class="clsx(['w-8 h-8 shrink-0', isActive ? 'text-neutral-800' : 'text-white'])"
    />
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-300"
    >
      <span
        v-if="uiStore.isSidebarOpen"
        :class="clsx(['font-bold text-lg', isActive ? 'text-neutral-800' : 'text-white'])"
        >{{ props.name }}</span
      >
    </Transition>
  </RouterLink>
</template>
