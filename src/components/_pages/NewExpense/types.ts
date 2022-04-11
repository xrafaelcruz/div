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
  userName: Record<string, string>
}

export type UserField = { id: string; userName: string; checked: boolean }
