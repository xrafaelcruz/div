import { convertToMoney } from 'utils/normalize'

import * as t from './types'
import * as s from './styles'

const GroupExpenses = ({ expenses }: t.GroupExpensesProps) => (
  <section>
    <h2>{expenses?.length ? 'Despesas' : ''}</h2>

    <s.ExpenseList>
      {expenses?.map((expense) => {
        return (
          <s.ExpenseItem key={expense.id}>
            <s.ExpenseName>{expense.name}</s.ExpenseName>
            <s.ExpensePayerUser>{expense.userName} pagou</s.ExpensePayerUser>
            <s.ExpenseValue>{convertToMoney(expense.value)}</s.ExpenseValue>
          </s.ExpenseItem>
        )
      })}
    </s.ExpenseList>
  </section>
)

export default GroupExpenses
