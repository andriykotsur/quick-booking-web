import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: (): { sidebar: boolean } => ({
    sidebar: false,
  }),

  getters: {
    isSidebarOpen: (state) => state.sidebar,
  },

  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
  },

  persist: {
    pick: ['sidebar'],
  },
})
