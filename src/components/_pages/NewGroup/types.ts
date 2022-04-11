import { User } from 'services/user/types'

export type NewGroupProps = {
  user: User
}

export type FormData = {
  groupName: string
  userName: Record<string, string>
}

export type UserField = {
  id: string
  value: string
}
