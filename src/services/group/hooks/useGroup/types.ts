import { GroupDetails } from 'services/group/types'
import { Expense, Payment } from 'services/expense/types'

export type UseGroupProps = {
  idGroup?: string
  hasExpenses?: boolean
}

export type UseGroupReturn = {
  group?: GroupDetails
  expenses?: Expense[]
  payments?: Payment[]
}
