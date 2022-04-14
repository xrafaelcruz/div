import { useRouter } from 'next/router'

import useExpense from 'services/expense/hooks/useExpense'

import Layout from 'components/Layout'
import Button from 'components/Button'

import * as s from './styles'
import * as t from './types'

export default function Expense({ user }: t.ExpenseProps) {
  const router = useRouter()
  const { id } = router.query

  const { expense, deleteExpense } = useExpense({ idExpense: id as string })

  return (
    <Layout user={user}>
      <h1>{expense?.name}</h1>
      <s.Main>
        <s.Buttons>
          <Button type="button" variant="danger" onClick={deleteExpense}>
            Excluir
          </Button>
        </s.Buttons>
      </s.Main>
    </Layout>
  )
}
