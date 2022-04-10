import { User } from 'services/user/types'

export type NewExpenseProps = {
  user: User
}

export type FormData = {
  payerUserName: string
  idPayerUser: string
  idGroup: string
  name: string
  value: string
  description: string
  type: string
  memberName: Record<string, string>
}

export type MemberField = Record<string, { userName: string; value: boolean }>
