import { User } from 'services/user/types'

export type NewExpenseProps = {
  user: User
}

export type FormData = {
  payerUserEmail: string
  idGroup: string
  name: string
  value: string
  description: string
  type: string
}

export type UserField = {
  id: string
  name: string
  email: string
  checked: boolean
}
