<script setup lang="ts">
import {
  TooltipRoot,
  TooltipPortal,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  useForwardPropsEmits,
} from 'reka-ui'
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'

const props = defineProps<TooltipRootProps & { content?: string }>()
const emits = defineEmits<TooltipRootEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>

<template>
  <TooltipRoot v-bind="forward">
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>

    <TooltipPortal>
      <TooltipContent
        class="px-4 py-3 bg-white text-sm rounded leading-none select-none "
        align="center"
        side="right"
        :side-offset="5"
      >
        {{ content }}
        <TooltipArrow class="fill-white" :width="12" :height="6" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
