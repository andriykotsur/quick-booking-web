<script setup lang="ts">
import { ArrowIcon } from '@/icons'
import { Card } from '@/components/ui'

import MainLayout from '@/layouts/MainLayout.vue'

const mainItems = [
  {
    id: 'bookings',
    title: 'Bookings',
    description: 'Manage list of available bookings',
    slug: '/bookings',
  },
  {
    id: 'venues',
    title: 'Venues',
    description: 'Manage list of venues',
    slug: '/venues',
  },
]
</script>

<template>
  <MainLayout>
    <section class="py-12 w-full grid grid-cols-2 gap-4">
      <Card
        v-for="item in mainItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        class="p-6 bg-neutral-800"
      >
        <RouterLink
          :to="item.slug"
          class="ml-auto w-8 h-8 flex justify-center items-center bg-white rounded-full"
        >
          <ArrowIcon aria-hidden="true" focusable="false" />
        </RouterLink>
      </Card>
    </section>
  </MainLayout>
</template>
