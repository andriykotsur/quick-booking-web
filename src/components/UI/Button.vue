<script setup lang="ts">
import { clsx } from 'clsx'
import { type ButtonHTMLAttributes } from 'vue'

const props = defineProps<{
  class?: ButtonHTMLAttributes['class']
  disabled?: ButtonHTMLAttributes['disabled']
  type: ButtonHTMLAttributes['type']
  size: 'sm' | 'md' | 'lg'
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button
    :class="
      clsx(
        [
          'rounded font-bold hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50',
          {
            'opacity-50 cursor-not-allowed': disabled,
          },
          {
            'p-2': props.size === 'sm',
            'p-4': props.size === 'md',
            'p-8': props.size === 'lg',
          },
          {
            'bg-white text-black': props.variant === 'primary',
            'bg-black text-white': props.variant === 'secondary',
            'bg-teal-500 text-white': props.variant === 'success',
            'bg-orange-500 text-white': props.variant === 'warning',
            'bg-red-500 text-white': props.variant === 'danger',
          },
        ],
        props.class,
      )
    "
    :type="props.type"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
