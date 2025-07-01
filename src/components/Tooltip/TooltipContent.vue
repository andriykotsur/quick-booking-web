<script setup lang="ts">
import { TooltipPortal, TooltipContent, TooltipArrow, useForwardPropsEmits } from 'reka-ui'
import type { TooltipContentProps, TooltipContentEmits } from 'reka-ui'

const props = defineProps<TooltipContentProps>()
const emits = defineEmits<TooltipContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      class="px-4 py-3 bg-white text-sm rounded leading-none select-none data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade"
      v-bind="forwarded"
    >
      <slot />
      <TooltipArrow class="fill-white" :width="12" :height="6" />
    </TooltipContent>
  </TooltipPortal>
</template>
