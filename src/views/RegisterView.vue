<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button, Input, Layout } from '@/components/ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'

import { useAuth } from '@/composables/useAuth'
import { useToastStore } from '@/stores/toast'

const router = useRouter()

const toastStore = useToastStore()

const { register } = useAuth()

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
    const { data, error } = await register({ name, email, password }, { credentials: 'include' })

    if (error.value || !data.value) {
      toastStore.setToast('error', 'Failed to register', error.value.message)
      return
    }

    toastStore.setToast('success', 'Success', 'Successfully registered')

    await router.push('/login')
  } catch (error) {
    console.error(error)
    toastStore.setToast('error', 'Error occurred', 'Unexpected error')
  }
})
</script>

<template>
  <Layout class="p-8 w-screen h-screen flex flex-col justify-center items-center bg-neutral-900">
    <section class="max-w-xl w-full">
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
          Already have an account?
          <RouterLink to="/login" class="underline">Login</RouterLink>
        </p>

        <Button type="submit" size="md" variant="primary" class="mt-4">Register</Button>
      </form>
    </section>
  </Layout>
</template>
