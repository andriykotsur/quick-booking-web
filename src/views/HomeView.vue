<script setup lang="ts">
import { ArrowIcon } from '@/components/Icons'
import { CardContainer, CardHeader, CardContent, CardFooter } from '@/components/Card'

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
      <CardContainer class="p-6 bg-neutral-800" v-for="item in mainItems" :key="item.id">
        <CardHeader :title="item.title"></CardHeader>
        <CardContent :description="item.description"></CardContent>
        <CardFooter>
          <RouterLink
            :to="item.slug"
            class="ml-auto w-8 h-8 flex justify-center items-center bg-white rounded-full transition duration-300 ease-in-out hover:opacity-50"
          >
            <ArrowIcon aria-hidden="true" focusable="false" />
          </RouterLink>
        </CardFooter>
      </CardContainer>
    </section>
  </MainLayout>
</template>
