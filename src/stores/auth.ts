import { defineStore } from 'pinia'
import { checkIsTokenExpired } from '@/utils/auth'

import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', {
  state: (): { accessToken: string; user: null | User } => ({
    accessToken: '',
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isTokenExpired: (state) => checkIsTokenExpired(state.accessToken),
  },

  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
    },

    removeAccessToken() {
      this.accessToken = ''
    },
  },

  persist: {
    pick: ['accessToken'],
  },
})
