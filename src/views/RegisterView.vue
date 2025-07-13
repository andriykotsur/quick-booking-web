<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import AuthLayout from '@/layouts/AuthLayout.vue'
import { Button, Input } from '@/components/UI'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'

import { authService } from '@/services/auth'
import { useToastStore } from '@/stores/toast'

const router = useRouter()

const { register } = authService()
const toastStore = useToastStore()

const isLoading = ref(false)

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(20, { message: 'Name must be less than 20 characters' }),

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

const onSubmit = form.handleSubmit(async ({ name, password, email }) => {
  try {
    isLoading.value = true

    const { data, error } = await register({ name, email, password }, { credentials: 'include' })

    if (error.value || !data.value) {
      console.error('Failed to login', error.value.message)
      toastStore.setToast('danger', 'Failed to login', 'Please try again.')
      return
    }

    toastStore.setToast(
      'success',
      'Success',
      'Successfully registered. Please login to access the Dashboard.',
    )

    await router.push('/login')
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
      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="flex flex-col" label="Name">
          <FormLabel class="text-white">Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Enter name" size="md" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

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
        Already have an account?
        <RouterLink to="/login" class="underline">Login</RouterLink>
      </p>

      <Button type="submit" :disabled="isLoading" size="md" variant="primary" class="mt-4"
        >Register</Button
      >
    </form>
  </AuthLayout>
</template>
