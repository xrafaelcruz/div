import { currencyMask } from 'utils/masks/currency'

import { ExpenseWithUsers } from 'services/expense/types'
import { User } from 'services/user/types'
import * as t from './types'

export const getDefaultValues = (
  user: User,
  idGroup?: string | string[],
  expense?: ExpenseWithUsers
): t.GetDefaultValuesReturn => {
  console.log('expense', expense, idGroup)

  const value = expense?.value
    ? currencyMask(Number(expense?.value).toFixed(2))
    : ''

  const payerUserEmail = expense ? expense.userEmail : user.email

  console.log('payerUserEmail', payerUserEmail)

  return {
    idGroup: (idGroup as string) ?? '',
    name: expense?.name,
    value,
    type: expense?.type,
    description: expense?.description,
    payerUserEmail
  }
}
