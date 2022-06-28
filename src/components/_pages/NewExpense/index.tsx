import ExpenseForm from 'components/ExpenseForm'
import * as t from './types'

export default function NewExpense({ user, groups }: t.NewExpenseProps) {
  return <ExpenseForm user={user} groups={groups} />
}
