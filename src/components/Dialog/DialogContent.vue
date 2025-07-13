<script setup lang="ts">
import { clsx } from 'clsx'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'

import { CloseIcon } from '@/components/Icons'

const props = defineProps<{ size: 'sm' | 'md' | 'lg' } & DialogContentProps>()
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 bg-neutral-900 opacity-30 z-30 data-[state=open]:animate-overlayShow"
    />
    <DialogContent
      :class="
        clsx([
          'fixed top-[50%] left-[50%] p-6 max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-6 rounded-md bg-white z-[100] focus:outline-none data-[state=open]:animate-contentShow',
          {
            'max-w-xl': props.size === 'sm',
            'max-w-2xl': props.size === 'md',
            'max-w-4xl': props.size === 'lg',
          },
        ])
      "
      v-bind="forwarded"
    >
      <slot />

      <DialogClose
        aria-label="Close"
        class="absolute top-6 right-6 w-6 h-6 p-1 inline-flex justify-center items-center z-[5]"
      >
        <CloseIcon aria-hidden="true" focusable="false" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
