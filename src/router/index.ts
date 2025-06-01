import { createRouter, createWebHistory } from 'vue-router'

import { authMiddleware } from '@/router/middleware/auth'
import { userMiddleware } from '@/router/middleware/user'

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

router.beforeEach(authMiddleware)
router.beforeEach(userMiddleware)

export default router
