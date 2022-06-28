import { User } from 'services/user/types'
import { ExpenseWithUsers } from 'services/expense/types'
import { Group } from 'services/group/types'

export type EditExpenseProps = {
  user: User
  expense: ExpenseWithUsers
  groups: Group[]
}
