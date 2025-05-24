import { defineStore } from 'pinia'

export type ToastVariant = 'info' | 'success' | 'danger' | 'warning'

export const useToastStore = defineStore('toast', {
  state: (): { variant: ToastVariant; message: string; description?: string } => ({
    variant: 'info',
    message: '',
    description: '',
  }),

  getters: {
    isToastOpen: (state) => !!state.message,
  },

  actions: {
    setToast(variant: ToastVariant, message: string, description?: string) {
      this.variant = variant
      this.message = message
      this.description = description
    },
    removeToast() {
      this.variant = 'info'
      this.message = ''
      this.description = ''
    },
  },
})
