import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

import { userService } from '@/services/user'
import { useUserStore } from '@/stores/user'

export async function userMiddleware(
  to: RouteLocationNormalized,
  __: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const { getMe } = userService()
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isUser) {
    const { data, error } = await getMe({ credentials: 'include' })

    if (error.value || !data.value) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    }

    userStore.setUser(data.value)
  }

  next()
}
