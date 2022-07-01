import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getExpenseListService } from 'services/expense'
import { Expense } from 'services/expense/types'

export default function useGetExpenseList() {
  const requestedGetExpenses = useRef(false)

  const router = useRouter()
  const { idGroup } = router.query

  const [expenses, setExpenses] = useState<Expense[]>()

  useEffect(() => {
    const getExpenses = async () => {
      const foundedExpenses = await getExpenseListService(idGroup)
      setExpenses(foundedExpenses || [])
    }

    if (idGroup && !requestedGetExpenses.current) {
      requestedGetExpenses.current = true
      getExpenses()
    }
  }, [idGroup])

  return {
    expenses
  }
}
