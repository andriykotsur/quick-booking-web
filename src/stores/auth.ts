import { defineStore } from 'pinia'
import { checkIsTokenExpired } from '@/utils/auth'

export const useAuthStore = defineStore('auth', {
  state: (): { accessToken: string } => ({
    accessToken: '',
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
