import { User } from 'services/user/types'
import { GroupDetails } from 'services/group/types'
import { Expense } from 'services/expense/types'

export type GroupProps = {
  user: User
  group: GroupDetails
  expenses?: Expense[]
}
