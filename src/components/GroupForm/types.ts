import { GroupDetails } from 'services/group/types'
import { User } from 'services/user/types'

export type GroupFormProps = {
  user: User
  group?: GroupDetails
}

export type FormData = {
  name: string
  description?: string
  emailLoggedUser: string
  email: Record<string, string>
}

export type UserField = {
  id: string
  value: string
}
