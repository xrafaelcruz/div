import useGetGroups from 'services/group/hooks/useGetGroups'
import ExpenseForm from 'components/ExpenseForm'
import * as t from './types'

export default function NewExpense({ user }: t.NewExpenseProps) {
  const { groups } = useGetGroups(user)

  return <>{groups && <ExpenseForm user={user} groups={groups} />}</>
}
