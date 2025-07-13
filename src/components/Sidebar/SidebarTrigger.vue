<script setup lang="ts">
import { MenuIcon } from '@/components/Icons'

import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()
</script>

<template>
  <button
    type="button"
    aria-label="Toggle sidebar"
    class="px-4 py-3 flex items-center gap-4 bg-transparent rounded-md transition duration-300 ease-in-out hover:bg-neutral-900"
    @click="uiStore.toggleSidebar()"
  >
    <MenuIcon
      aria-hidden="true"
      focusable="false"
      class="w-8 h-8 text-white"
    />
  </button>
</template>
