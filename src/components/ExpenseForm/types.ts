import { User } from 'services/user/types'
import { ExpenseWithUsers } from 'services/expense/types'

export type ExpenseFormProps = {
  user: User
  expense?: ExpenseWithUsers
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
