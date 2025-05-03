<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'

import { useFormField } from './useFormField'

const { name, formMessageId } = useFormField()
</script>

<template>
  <ErrorMessage
    as="p"
    :id="formMessageId"
    :name="toValue(name)"
    class="text-red-700 text-sm font-medium"
  />
</template>
