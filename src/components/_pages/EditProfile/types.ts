import { User } from 'services/user/types'

export type ProfileProps = {
  user: User
}

export type FormData = {
  name: string
  pix?: string
  description?: string
}
