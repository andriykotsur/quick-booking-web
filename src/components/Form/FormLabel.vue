<script lang="ts" setup>
import { clsx } from 'clsx'
import type { HTMLAttributes } from 'vue'
import type { LabelProps } from 'reka-ui'
import { Label } from 'reka-ui'

import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>

<template>
  <Label
    :class="clsx(
      error && 'text-destructive',
      props.class,
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
