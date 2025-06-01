import { defineStore } from 'pinia'

import type { Nullable } from '@/types'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', {
  state: (): { user: Nullable<User> } => ({
    user: null,
  }),

  getters: {
    isUser: (state) => !!state.user,
  },

  actions: {
    setUser(user: Nullable<User>) {
      this.user = user
    },

    removeUser() {
      this.user = null
    },
  },
})
