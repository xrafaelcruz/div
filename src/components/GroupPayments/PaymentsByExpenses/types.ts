import { Payment } from 'services/expense/types'
import { User } from 'services/user/types'

export type PaymentsByExpensesProps = {
  user: User
  payments?: Payment[]
}
