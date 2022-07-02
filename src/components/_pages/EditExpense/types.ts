import { User } from 'services/user/types'
import { ExpenseWithUsers } from 'services/expense/types'

export type EditExpenseProps = {
  user: User
  expense: ExpenseWithUsers
}
