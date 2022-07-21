import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getExpenseService } from 'services/expense'
import { getLoader } from 'lib/loader'

import { ExpenseWithUsers } from 'services/expense/types'

export default function useGetExpense() {
  const requested = useRef(false)

  const router = useRouter()
  const { idExpense } = router.query

  const [expense, setExpense] = useState<ExpenseWithUsers | null>()

  useEffect(() => {
    const getExpenses = async () => {
      getLoader()?.continuousStart()

      const foundedExpense = await getExpenseService(idExpense as string)
      setExpense(foundedExpense)

      getLoader()?.complete()
    }

    if (idExpense && !requested.current) {
      requested.current = true
      getExpenses()
    }
  }, [idExpense])

  return {
    expense
  }
}
