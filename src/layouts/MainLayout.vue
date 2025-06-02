<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes } from 'vue'
import { useRoute } from 'vue-router'

import { Avatar, Layout } from '@/components/ui'
import {
  SidebarContainer,
  SidebarFooter,
  SidebarItem,
  SidebarLink,
  SidebarMenu,
} from '@/components/Sidebar'
import { BookIcon, HouseIcon, SettingsIcon, UtensilsIcon } from '@/icons'

import { useUserStore } from '@/stores/user'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const mainItems = [
  {
    id: 'home',
    title: 'Home',
    icon: HouseIcon,
    slug: '/',
  },
  {
    id: 'bookings',
    title: 'Bookings',
    icon: BookIcon,
    slug: '/bookings',
  },
  {
    id: 'venues',
    title: 'Venues',
    icon: UtensilsIcon,
    slug: '/venues',
  },
]

const footerItems = [
  {
    id: 'settings',
    title: 'Settings',
    icon: SettingsIcon,
    slug: '/settings',
  },
]

const route = useRoute()
const userStore = useUserStore()
</script>

<template>
  <Layout :class="clsx(['w-screen h-screen flex bg-neutral-900', props.class])">
    <SidebarContainer>
      <SidebarMenu>
        <SidebarItem v-for="item in mainItems" :key="item.id">
          <SidebarLink :name="item.title" :slug="item.slug" :icon="item.icon" />
        </SidebarItem>
      </SidebarMenu>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarItem v-for="item in footerItems" :key="item.id">
            <SidebarLink :name="item.title" :slug="item.slug" :icon="item.icon" />
          </SidebarItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarContainer>

    <div class="p-8 w-full h-full">
      <header class="flex justify-between items-center gap-x-4">
        <h1 class="font-bold text-4xl text-white">{{ route.name }}</h1>
        <aside class="max-w-80 w-full p-4 flex items-center gap-x-4 bg-neutral-800 rounded-xl">
          <Avatar :image="{ source: '', alt: '' }" size="md" />

          <div class="flex flex-col gap-y-1">
            <h3 class="font-medium text-white">{{ userStore.user?.name ?? 'N/A' }}</h3>
            <span class="text-sm text-white">{{ userStore.user?.email ?? 'N/A' }}</span>
          </div>
        </aside>
      </header>

      <slot />
    </div>
  </Layout>
</template>
