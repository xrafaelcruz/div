import { Payment } from 'services/expense/types'
import { User } from 'services/user/types'

export type GroupPaymentsProps = {
  user: User
  payments?: Payment[]
}
