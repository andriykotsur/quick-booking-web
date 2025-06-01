<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import AuthLayout from '@/layouts/AuthLayout.vue'
import { Button, Input } from '@/components/ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'

import { authService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()

const { login } = authService()
const authStore = useAuthStore()
const toastStore = useToastStore()

const isLoading = ref(false)

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
    isLoading.value = true

    const { data, error } = await login({ email, password }, { credentials: 'include' })

    if (error.value || !data.value) {
      console.error('Failed to login', error.value.message)
      toastStore.setToast('danger', 'Failed to login', 'Please try again.')
      return
    }

    authStore.setAccessToken(data.value)
    toastStore.setToast('success', 'Success', 'Successfully login. Welcome to dashboard.')

    const redirectTo = route.query.redirect?.toString() || '/'
    await router.push(redirectTo)
  } catch (error) {
    console.error('Error occurred', error)
    toastStore.setToast('danger', 'Error occurred', 'Unexpected error. Please try again.')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <AuthLayout>
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
            <Input type="password" placeholder="Enter password" size="md" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <p class="text-sm text-white opacity-50">
        Don't have an account?
        <RouterLink to="/register" class="underline">Register</RouterLink>
      </p>

      <Button type="submit" :disabled="isLoading" size="md" variant="primary" class="mt-4"
        >Login</Button
      >
    </form>
  </AuthLayout>
</template>
