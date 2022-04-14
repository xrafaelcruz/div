import { ExpenseWithUsers } from 'services/expense/types'

export type UseExpenseProps = {
  idExpense?: string
}

export type UseExpenseReturn = {
  expense?: ExpenseWithUsers
  deleteExpense: () => void
}
