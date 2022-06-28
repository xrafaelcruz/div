import { Payment, PaymentByUser } from 'services/expense/types'
import { User } from 'services/user/types'

export type GroupPaymentsProps = {
  user: User
  paymentsByExpenses: Payment[]
  paymentsByUsers: PaymentByUser[]
}
