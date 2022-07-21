import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getPaymentsByExpensesService } from 'services/expense'
import { getLoader } from 'lib/loader'

import { Payment } from 'services/expense/types'

export default function useGetPaymentsByExpenses() {
  const requested = useRef(false)

  const router = useRouter()
  const { idGroup } = router.query

  const [paymentsByExpenses, setPaymentsByExpenses] = useState<Payment[]>()

  useEffect(() => {
    const getPaymentsByExpenses = async () => {
      getLoader()?.continuousStart()

      const foundedPayments = await getPaymentsByExpensesService(
        idGroup as string
      )
      setPaymentsByExpenses(foundedPayments || [])

      getLoader()?.complete()
    }

    if (idGroup && !requested.current) {
      requested.current = true
      getPaymentsByExpenses()
    }
  }, [idGroup])

  return {
    paymentsByExpenses
  }
}
