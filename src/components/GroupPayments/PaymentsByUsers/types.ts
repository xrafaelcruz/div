import { PaymentByUser } from 'services/expense/types'
import { User } from 'services/user/types'

export type PaymentsByUsersProps = {
  user: User
  payments?: PaymentByUser[]
}
