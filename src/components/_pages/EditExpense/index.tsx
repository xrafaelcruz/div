import ExpenseForm from 'components/ExpenseForm'

import * as t from './types'

export default function EditExpense({
  user,
  expense,
  groups
}: t.EditExpenseProps) {
  return <ExpenseForm user={user} expense={expense} groups={groups} />
}
