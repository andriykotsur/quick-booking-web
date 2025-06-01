import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

import { authService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'

export async function authMiddleware(
  to: RouteLocationNormalized,
  __: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const { refresh } = authService()
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      authStore.removeAccessToken()
      next({ name: 'Login', query: { redirect: to.fullPath } })
    }

    if (authStore.isTokenExpired) {
      const { data, error } = await refresh({ credentials: 'include' })

      if (error.value || !data.value) {
        authStore.removeAccessToken()
        next({ name: 'Login', query: { redirect: to.fullPath } })
      }

      authStore.setAccessToken(data.value ?? '')
    }
  }

  next()
}
