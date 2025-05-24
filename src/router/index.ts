import { createRouter, createWebHistory } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { refresh } = useAuth()
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
      const { data, error } = await refresh({ credentials: 'include' })

      if (error.value || !data.value) {
        authStore.clearAccessToken()
        return next({ name: 'Login', query: { redirect: to.fullPath } })
      }

      authStore.setAccessToken(data.value)
    }
  }

  next()
})

export default router
