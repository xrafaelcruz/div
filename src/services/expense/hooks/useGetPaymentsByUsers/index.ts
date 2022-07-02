import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getPaymentsByUsersService } from 'services/expense'
import { PaymentByUser } from 'services/expense/types'

export default function useGetPaymentsByUsers() {
  const requested = useRef(false)

  const router = useRouter()
  const { idGroup } = router.query

  const [paymentsByUsers, setPaymentsByUsers] = useState<PaymentByUser[]>()

  useEffect(() => {
    const getPaymentsByExpenses = async () => {
      const foundedPayments = await getPaymentsByUsersService(idGroup as string)
      setPaymentsByUsers(foundedPayments || [])
    }

    if (idGroup && !requested.current) {
      requested.current = true
      getPaymentsByExpenses()
    }
  }, [idGroup])

  return {
    paymentsByUsers
  }
}
