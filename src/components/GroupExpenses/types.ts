import { User } from 'services/user/types'
import { Expense } from 'services/expense/types'

export type GroupExpensesProps = {
  user: User
  expenses?: Expense[]
}
