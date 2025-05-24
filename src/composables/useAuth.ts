import { useFetch } from './useFetch.ts'
import type { UseFetchOptions } from '@vueuse/core'

const API_ROUTE = 'auth'

export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams extends LoginParams {
  name: string
}

export const useAuth = () => {
  const login = (payload: LoginParams, options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}/login`, options, useFetchOptions).post(payload).json<string>()

  const register = (
    payload: RegisterParams,
    options: RequestInit,
    useFetchOptions?: UseFetchOptions,
  ) => useFetch(`${API_ROUTE}/register`, options, useFetchOptions).post(payload).json<string>()

  const logout = (options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}/logout`, options, useFetchOptions).post().json<string>()

  const refresh = (options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}/refresh`, options, useFetchOptions).post().json<string>()

  return {
    login,
    register,
    logout,
    refresh,
  }
}
