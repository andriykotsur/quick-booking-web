<script setup lang="ts">
import { clsx } from 'clsx'
import { ToastClose, ToastDescription, ToastRoot, ToastTitle } from 'reka-ui'
import { type HTMLAttributes } from 'vue'

import { CloseIcon } from '@/components/Icons'

import type { ToastVariant } from '@/stores/toast'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant: ToastVariant
  message: string
  description?: string
}>()

const emit = defineEmits(['remove'])
</script>

<template>
  <ToastRoot
    class="p-4 flex justify-between gap-x-2 bg-white border rounded data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
  >
    <div class="flex flex-col gap-y-2">
      <ToastTitle
        v-if="props.message"
        :class="
          clsx([
            'font-bold text-lg',
            {
              'text-black': props.variant === 'info',
              'text-teal-500': props.variant === 'success',
              'text-red-500': props.variant === 'danger',
              'text-orange-500': props.variant === 'warning',
            },
            props.class,
          ])
        "
      >
        {{ props.message }}
      </ToastTitle>
      <ToastDescription v-if="description" class="font-medium text-sm text-black opacity-50">
        {{ props.description }}
      </ToastDescription>
    </div>
    <ToastClose
      aria-label="Close"
      class="w-4 h-4 flex justify-center items-center text-black"
      @click="emit('remove')"
    >
      <CloseIcon aria-hidden="true" focusable="false" />
    </ToastClose>
  </ToastRoot>
</template>
