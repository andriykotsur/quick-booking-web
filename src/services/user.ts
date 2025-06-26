import type { UseFetchOptions } from '@vueuse/core'
import type { User } from '@/types/user'

import { useFetch } from '@/composables/useFetch'

const API_ROUTE = 'user'

export type CreateUserParams = Pick<User, 'name' | 'email'> & {
  password: string
}

export type UpdateUserParams = Pick<User, 'name' | 'email'>

export const userService = () => {
  const create = (
    payload: CreateUserParams,
    options: RequestInit,
    useFetchOptions?: UseFetchOptions,
  ) => useFetch(API_ROUTE, options, useFetchOptions).post(payload).json<User>()

  const getMe = (options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}/me`, options, useFetchOptions).get().json<User>()

  const getById = (id: string, options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}/${id}`, options, useFetchOptions).get().json<User>()

  const update = (
    id: string,
    payload: UpdateUserParams,
    options: RequestInit,
    useFetchOptions?: UseFetchOptions,
  ) => useFetch(`${API_ROUTE}/${id}`, options, useFetchOptions).put(payload).json<User>()

  const remove = (id: string, options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}/${id}`, options, useFetchOptions).delete().json()

  return {
    create,
    getMe,
    getById,
    update,
    remove,
  }
}
