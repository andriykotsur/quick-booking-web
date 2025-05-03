<script setup lang="ts">
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <main :class="props.class">
    <slot />
  </main>
</template>
