<script setup lang="ts">
import { computed, ref } from 'vue'

import { PanelCloseIcon, PanelOpenIcon } from '@/icons'

const isSidebarOpen = ref(true)

const IconComponent = computed(() => (isSidebarOpen.value ? PanelOpenIcon : PanelCloseIcon))

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <button
    type="button"
    aria-label="Toggle sidebar"
    class="relative flex justify-center items-center bg-transparent rounded"
    @click="toggleSidebar"
  >
    <component
      :is="IconComponent"
      aria-hidden="true"
      focusable="false"
      class="w-8 h-8 text-white"
    />
  </button>
</template>
