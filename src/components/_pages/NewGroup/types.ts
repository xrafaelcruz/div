import { User } from 'services/user/types'

export type NewGroupProps = {
  user: User
}

export type FormData = {
  name: string
  description?: string
  userName: Record<string, string>
}

export type UserField = {
  id: string
  value: string
}
