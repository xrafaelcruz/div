import { User } from '@prisma/client'

export type HomeProps = {
  user: User
  users: User[]
}
