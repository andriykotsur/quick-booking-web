import { createRouter, createWebHistory } from 'vue-router'

import { authMiddleware } from '@/router/middleware/auth'
import { userMiddleware } from '@/router/middleware/user'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import BookingsView from '@/views/BookingsView.vue'
import VenuesView from '@/views/VenuesView.vue'
import SettingsView from '@/views/SettingsView.vue'

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
    {
      path: '/bookings',
      name: 'Bookings',
      component: BookingsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/venues',
      name: 'Venues',
      component: VenuesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(authMiddleware)
router.beforeEach(userMiddleware)

export default router
