<script setup lang="ts">
import { clsx } from 'clsx'
import { computed } from 'vue'
import type { HTMLAttributes, Component } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  class?: HTMLAttributes['class']
  icon?: Component
  name: string
  slug: string
}>()

const route = useRoute()
const isActive = computed(() => route.path === props.slug)
</script>

<template>
  <RouterLink
    :to="props.slug"
    :class="
      clsx([
        'px-4 py-3 flex items-center gap-4 bg-transparent rounded-md transition duration-200 ease-in-out hover:bg-neutral-900',
        { 'bg-white hover:bg-white': isActive },
        props.class,
      ])
    "
  >
    <component
      v-if="props.icon"
      :is="props.icon"
      :class="clsx('w-5 h-5 text-white', { 'text-neutral-800': isActive })"
    />
    <span :class="clsx(['font-bold text-lg text-white', { 'text-neutral-800': isActive }])">{{
      props.name
    }}</span>
  </RouterLink>
</template>
