<script setup lang="ts">
import { ToastProvider, ToastViewport } from 'reka-ui'
import { RouterView } from 'vue-router'

import { Toast } from '@/components/UI'

import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
</script>

<template>
  <ToastProvider>
    <Toast
      v-if="toastStore.isToastOpen"
      :variant="toastStore.variant"
      :message="toastStore.message"
      :description="toastStore.description"
      @remove="toastStore.removeToast"
    />

    <ToastViewport
      class="fixed right-0 bottom-0 m-0 p-8 max-w-xl w-full flex flex-col gap-4 list-none outline-none z-[2147483647]"
    />
  </ToastProvider>

  <RouterView />
</template>
