<script setup lang="ts">
import { clsx } from 'clsx'
import { type HTMLAttributes, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { BookIcon, HouseIcon, SettingsIcon, UtensilsIcon } from '@/components/Icons'
import { Avatar, Button, Layout } from '@/components/ui'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '@/components/Dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/DropdownMenu'
import {
  SidebarContainer,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarItem,
  SidebarLink,
  SidebarTrigger,
} from '@/components/Sidebar'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/Tooltip'

import { useUIStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const menuItems = [
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
  {
    id: 'settings',
    title: 'Settings',
    icon: SettingsIcon,
    slug: '/settings',
  },
]

const route = useRoute()
const router = useRouter()

const uiStore = useUIStore()
const userStore = useUserStore()

const isLogoutDialogOpen = ref(false)
</script>

<template>
  <Layout :class="clsx(['w-screen h-screen flex bg-neutral-900', props.class])">
    <TooltipProvider :delay-duration="300">
      <SidebarContainer>
        <SidebarHeader>
          <Tooltip disableClosingTrigger>
            <TooltipTrigger as-child>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent align="center" side="right" :side-offset="5">
              {{ uiStore.isSidebarOpen ? 'Collapse menu' : 'Expand menu' }}
            </TooltipContent>
          </Tooltip>
        </SidebarHeader>

        <SidebarMenu>
          <SidebarItem v-for="item in menuItems" :key="item.id">
            <Tooltip :disabled="uiStore.isSidebarOpen">
              <TooltipTrigger as-child>
                <SidebarLink :name="item.title" :slug="item.slug" :icon="item.icon" />
              </TooltipTrigger>
              <TooltipContent align="center" side="right" :side-offset="5">
                {{ item.title }}
              </TooltipContent>
            </Tooltip>
          </SidebarItem>
        </SidebarMenu>

        <SidebarFooter>
          <Tooltip>
            <DropdownMenu>
              <TooltipTrigger as-child>
                <DropdownMenuTrigger as-child>
                  <Avatar
                    :image="{
                      source: userStore.user?.avatarUrl ?? '',
                      alt: userStore.user?.name ?? '',
                    }"
                    size="lg"
                  />
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <DropdownMenuContent align="start" side="top" :side-offset="15">
                <DropdownMenuItem class="flex gap-x-2" @click="router.push(`/user/me`)">
                  <Avatar
                    :image="{
                      source: userStore.user?.avatarUrl ?? '',
                      alt: userStore.user?.name ?? '',
                    }"
                    size="lg"
                  />
                  <div v-if="userStore.user" class="flex flex-col gap-1">
                    <span>{{ userStore.user.name ?? 'N/A' }}</span>
                    <span>{{ userStore.user.email ?? 'N/A' }}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem @click="router.push(`/user/change-password`)">
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem @click="isLogoutDialogOpen = true"> Log Out </DropdownMenuItem>
              </DropdownMenuContent>
              <TooltipContent align="center" side="right" :side-offset="5">
                My Account
              </TooltipContent>
            </DropdownMenu>
          </Tooltip>
        </SidebarFooter>
      </SidebarContainer>
    </TooltipProvider>

    <div class="p-8 w-full h-full">
      <h1 class="font-bold text-4xl text-white">{{ route.name }}</h1>
      <slot />
    </div>
  </Layout>

  <Dialog v-model:open="isLogoutDialogOpen">
    <DialogContent size="sm">
      <DialogHeader title="Do you want to logout?" />
      <DialogFooter>
        <DialogClose as-child>
          <Button type="button" size="sm" variant="primary">Cancel</Button>
        </DialogClose>
        <DialogClose>
          <Button type="button" size="sm" variant="secondary">Submit</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
