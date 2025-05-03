<script setup lang="ts">
import { clsx } from 'clsx'
import { type InputHTMLAttributes } from 'vue'

const props = defineProps<{
  disabled?: InputHTMLAttributes['disabled']
  class?: InputHTMLAttributes['class']
  size: 'sm' | 'md' | 'lg'
}>()

const emit = defineEmits(['blur', 'keypress'])

const value = defineModel()
</script>

<template>
  <input
    :class="
      clsx(
        [
          'bg-transparent border rounded text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50',
          {
            'opacity-50 cursor-not-allowed': props.disabled,
          },
          {
            'p-2': props.size === 'sm',
            'p-4': props.size === 'md',
            'p-8': props.size === 'lg',
          },
        ],
        props.class,
      )
    "
    @blur="emit('blur')"
    @keyup="emit('keypress')"
    v-model="value"
  />
</template>

