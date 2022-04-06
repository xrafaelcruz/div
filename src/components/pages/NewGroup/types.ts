import { User } from '@prisma/client'

export type NewGroupProps = {
  user: User
}

export type FormData = {
  groupName: string
  memberName: any
}

export type MemberField = {
  id: string
  value: string
}
