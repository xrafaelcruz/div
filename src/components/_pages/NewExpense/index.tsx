import ExpenseForm from 'components/ExpenseForm'
import * as t from './types'

export default function NewExpense({ user }: t.NewExpenseProps) {
  return <ExpenseForm user={user} />
}
