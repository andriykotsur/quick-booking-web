import type { UseFetchOptions } from '@vueuse/core'
import type { User } from '@/types/user'

import { useFetch } from '@/composables/useFetch'
import type { Venue } from '@/types/venue.ts'

const API_ROUTE = 'venue'

export type CreateVenueParams = Pick<Venue, 'name' | 'location' | 'type'>

export type UpdateVenueParams = Pick<Venue, 'name' | 'location'>

export const venueService = () => {
  const createVenue = (
    payload: CreateVenueParams,
    options: RequestInit,
    useFetchOptions?: UseFetchOptions,
  ) => useFetch(API_ROUTE, options, useFetchOptions).post(payload).json<User>()

  const getVenues = (options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}`, options, useFetchOptions).get().json<User>()

  const getVenueById = (id: string, options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}/${id}`, options, useFetchOptions).get().json<User>()

  const updateVenue = (
    id: string,
    payload: UpdateVenueParams,
    options: RequestInit,
    useFetchOptions?: UseFetchOptions,
  ) => useFetch(`${API_ROUTE}/${id}`, options, useFetchOptions).put(payload).json<User>()

  const removeVenue = (id: string, options: RequestInit, useFetchOptions?: UseFetchOptions) =>
    useFetch(`${API_ROUTE}/${id}`, options, useFetchOptions).delete().json()

  return {
    createVenue,
    getVenues,
    getVenueById,
    updateVenue,
    removeVenue,
  }
}
