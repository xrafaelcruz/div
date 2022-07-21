import { User } from 'services/user/types'

type Params =
  | {
      name?: string
      email: string
    }
  | User

export const getUserName = (user: Params) =>
  user.name ? user.name : user.email
