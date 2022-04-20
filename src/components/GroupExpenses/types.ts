import { Expense } from 'services/expense/types'
import { User } from 'services/user/types'

export type GroupExpensesProps = {
  expenses?: Expense[]
  user: User
}
