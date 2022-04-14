import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getExpenseService, deleteExpenseService } from 'services/expense'

import { ExpenseWithUsers } from 'services/expense/types'
import * as t from './types'

const useExpense = ({ idExpense }: t.UseExpenseProps): t.UseExpenseReturn => {
  const requestedExpense = useRef(false)

  const router = useRouter()
  const [expense, setExpense] = useState<ExpenseWithUsers>()

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getExpenseService(idExpense)
        setExpense(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (!expense && !requestedExpense.current) {
      requestedExpense.current = true
      request()
    }
  }, [idExpense, expense, router])

  const deleteExpense = async () => {
    try {
      await deleteExpenseService(idExpense)
      router.back()
    } catch (e) {
      router.push('/')
    }
  }

  return { expense, deleteExpense }
}

export default useExpense
