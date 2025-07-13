<script setup lang="ts">
import { DropdownMenuItem, useForwardPropsEmits } from 'reka-ui'
import type { DropdownMenuItemProps, DropdownMenuItemEmits } from 'reka-ui'

const props = defineProps<DropdownMenuItemProps>()
const emits = defineEmits<DropdownMenuItemEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuItem
    class="p-3 flex items-center bg-transparent font-medium text-md rounded-md leading-none outline-none select-none cursor-pointer data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-900 data-[highlighted]:text-white"
    v-bind="forwarded"
  >
    <slot />
  </DropdownMenuItem>
</template>
