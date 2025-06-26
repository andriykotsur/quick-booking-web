import { createFetch } from '@vueuse/core'

import { apiConfig } from '@/config'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'

let isRefreshing = false
const refreshSubscribers: Array<() => void> = []

function addRefreshSubscriber(callback: () => void) {
  refreshSubscribers.push(callback)
}

function onRefreshed() {
  refreshSubscribers.forEach((callback) => callback())
  refreshSubscribers.length = 0
}

export const useFetch = createFetch({
  baseUrl: `${apiConfig.url}/${apiConfig.version}`,
  options: {
    updateDataOnError: true,
    async beforeFetch({ options }) {
      const auth = useAuthStore()

      if (auth.accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.accessToken}`,
        }
      }

      return { options }
    },
    async onFetchError({ response, data, error, execute }) {
      const { refresh } = authService()
      const authStore = useAuthStore()

      if (response?.status === 401 && authStore.isTokenExpired) {
        if (!isRefreshing) {
          isRefreshing = true

          const { data, error } = await refresh({ credentials: 'include' })

          if (data.value && !error.value) {
            authStore.setAccessToken(data.value)

            isRefreshing = false
            onRefreshed()
          } else {
            refreshSubscribers.length = 0
          }
        }

        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            execute().then((response) => {
              resolve({ data, response })
            })
          })
        })
      }

      return { error, data }
    },
  },
})
