import { Role } from '@/enums/role'

export type User = {
  id: number
  name: string
  email: string
  role: Role
  avatarUrl?: string
}
