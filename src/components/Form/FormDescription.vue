<script lang="ts" setup>
import { clsx } from 'clsx'
import type { HTMLAttributes } from 'vue'

import { useFormField } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { formDescriptionId } = useFormField()
</script>

<template>
  <p
    :id="formDescriptionId"
    :class="clsx('text-sm text-white opacity-50', props.class)"
  >
    <slot />
  </p>
</template>
