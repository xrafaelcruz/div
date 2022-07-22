import Link from 'next/link'

import { convertToMoney } from 'utils/normalize'
import { getUserName } from 'utils/user'
import { formatDate } from 'utils/date'

import { User } from 'services/user/types'

import * as t from './types'
import * as s from './styles'

const GroupExpenses = ({ user, expenses }: t.GroupExpensesProps) => {
  const getName = (currentUser: User) => {
    if (currentUser.id === user.id) {
      return 'Você'
    }

    return getUserName(currentUser)
  }

  const hasExpenses = !!expenses?.length

  return (
    <s.Section>
      <h2>{hasExpenses ? 'Despesas' : ''}</h2>

      {hasExpenses && (
        <s.ExpenseList>
          {expenses.map((expense) => (
            <Link
              href={`/editar-despesa?idExpense=${expense.id}&idGroup=${expense.idGroup}`}
              key={expense.id}
            >
              <a>
                <s.ExpenseItem data-testid="expense" key={expense.id}>
                  <s.ExpenseName>{expense.name}</s.ExpenseName>

                  <s.ExpensePayerUser>
                    {getName(expense.user)} pagou
                  </s.ExpensePayerUser>

                  <s.DateValue>
                    <s.ExpenseValue>
                      {convertToMoney(expense.value)}
                    </s.ExpenseValue>

                    <s.Date>{formatDate(expense.createdAt)}</s.Date>
                  </s.DateValue>
                </s.ExpenseItem>
              </a>
            </Link>
          ))}
        </s.ExpenseList>
      )}

      {!hasExpenses && (
        <s.NotFound>Nenhuma despesa registrada ainda</s.NotFound>
      )}
    </s.Section>
  )
}

export default GroupExpenses
