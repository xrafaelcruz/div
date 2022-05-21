import { useRouter } from 'next/router'

import useExpense from 'services/expense/hooks/useExpense'

import ExpenseForm from 'components/ExpenseForm'

import * as t from './types'

export default function EditExpense({ user }: t.EditExpenseProps) {
  const router = useRouter()
  const { id } = router.query

  const { expense } = useExpense({ idExpense: id as string })

  return <>{expense && <ExpenseForm user={user} expense={expense} />}</>
}
