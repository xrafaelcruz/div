import { currencyMask } from 'utils/masks/currency'

import * as t from './types'
import * as s from './styles'

const GroupExpenses = ({ expenses }: t.GroupExpensesProps) => (
  <s.ExpenseList>
    {expenses?.map((expense) => {
      return (
        <s.ExpenseItem key={expense.id}>
          <s.ExpenseName>{expense.name}</s.ExpenseName>
          <s.ExpensePayerUser>{expense.userName} pagou</s.ExpensePayerUser>
          <s.ExpenseValue>{currencyMask(expense.value)}</s.ExpenseValue>
        </s.ExpenseItem>
      )
    })}
  </s.ExpenseList>
)

export default GroupExpenses
