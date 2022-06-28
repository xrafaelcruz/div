import { User } from 'services/user/types'
import { GroupDetails } from 'services/group/types'
import { Payment, PaymentByUser } from 'services/expense/types'

export type PaymentsProps = {
  user: User
  group: GroupDetails
  paymentsByExpenses: Payment[]
  paymentsByUsers: PaymentByUser[]
}
