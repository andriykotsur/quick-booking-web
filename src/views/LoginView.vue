<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button, Input, Layout } from '@/components/ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'

import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const toastStore = useToastStore()

const { login } = useAuth()

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Please enter a valid email address' }),

    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must be less than 100 characters' }),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async ({ email, password }) => {
  try {
    const { data, error } = await login({ email, password }, { credentials: 'include' })

    if (error.value || !data.value) {
      toastStore.setToast('danger', 'Failed to login', error.value.message)
      return
    }

    authStore.setAccessToken(data.value)
    toastStore.setToast('success', 'Success', 'Successfully login')

    const redirectTo = route.query.redirect?.toString() || '/'
    await router.push(redirectTo)
  } catch (error) {
    console.error('Error occurred', error)
    toastStore.setToast('danger', 'Error occurred', 'Unexpected error')
  }
})
</script>

<template>
  <Layout class="p-8 w-screen h-screen flex flex-col justify-center items-center bg-neutral-900">
    <section class="max-w-xl w-full">
      <form class="flex flex-col gap-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="flex flex-col" label="Email">
            <FormLabel class="text-white">Email</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter email" size="md" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="flex flex-col">
            <FormLabel class="text-white">Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter password"
                size="md"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <p class="text-sm text-white opacity-50">
          Don't have an account?
          <RouterLink to="/register" class="underline">Register</RouterLink>
        </p>

        <Button type="submit" size="md" variant="primary" class="mt-4">Login</Button>
      </form>
    </section>
  </Layout>
</template>
