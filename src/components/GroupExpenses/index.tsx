import { useRouter } from 'next/router'

import { convertToMoney } from 'utils/normalize'
import { getUserName } from 'utils/user'

import { User } from 'services/user/types'

import * as t from './types'
import * as s from './styles'
import { useEffect, useRef, useState } from 'react'
import { Expense } from 'services/expense/types'
import { getExpenseListService } from 'services/expense'

const GroupExpenses = ({ user }: t.GroupExpensesProps) => {
  const router = useRouter()
  const { idGroup } = router.query

  const requestedExpenses = useRef(false)

  const [expenses, setExpenses] = useState<Expense[]>()

  const getName = (currentUser: User) => {
    if (currentUser.id === user.id) {
      return 'Você'
    }

    return getUserName(currentUser)
  }

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getExpenseListService(idGroup as string)
        setExpenses(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (idGroup && !requestedExpenses.current) {
      requestedExpenses.current = true
      request()
    }
  }, [idGroup, expenses, router])

  return (
    <s.Section>
      <h2>{expenses?.length ? 'Despesas' : ''}</h2>

      {!!expenses?.length && (
        <s.ExpenseList>
          {expenses.map((expense) => (
            <s.ExpenseItem
              key={expense.id}
              onClick={() =>
                router.push(
                  `/despesa?id=${expense.id}&idGroup=${expense.idGroup}`
                )
              }
            >
              <s.ExpenseName>{expense.name}</s.ExpenseName>
              <s.ExpensePayerUser>
                {getName(expense.user)} pagou
              </s.ExpensePayerUser>
              <s.ExpenseValue>{convertToMoney(expense.value)}</s.ExpenseValue>
            </s.ExpenseItem>
          ))}
        </s.ExpenseList>
      )}

      {requestedExpenses.current && !expenses?.length && (
        <s.NotFound>Nenhuma despesa registrada ainda</s.NotFound>
      )}
    </s.Section>
  )
}

export default GroupExpenses
