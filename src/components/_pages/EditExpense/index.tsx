import useGetGroups from 'services/group/hooks/useGetGroups'
import ExpenseForm from 'components/ExpenseForm'
import * as t from './types'

export default function EditExpense({ user, expense }: t.EditExpenseProps) {
  const { groups } = useGetGroups(user)

  return (
    <>
      {groups && <ExpenseForm user={user} expense={expense} groups={groups} />}
    </>
  )
}
