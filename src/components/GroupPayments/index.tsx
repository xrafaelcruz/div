import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Payment, PaymentByUser } from 'services/expense/types'
import { getPaymentsService, getPaymentsByUsersService } from 'services/expense'

import PaymentsByExpenses from './PaymentsByExpenses'
import PaymentsByUsers from './PaymentsByUsers'

import * as t from './types'
import * as s from './styles'

const GroupPayments = ({ user }: t.GroupPaymentsProps) => {
  const [selectedFilter, setSelectedFilter] = useState('users')

  const router = useRouter()
  const { idGroup } = router.query

  const requestedPaymentsByExpenses = useRef(false)
  const requestedPaymentsByUsers = useRef(false)
  const [paymentsByExpenses, setPaymentsByExpenses] = useState<Payment[]>()
  const [paymentsByUsers, setPaymentsByUsers] = useState<PaymentByUser[]>()

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getPaymentsService(idGroup as string)
        setPaymentsByExpenses(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (idGroup && !requestedPaymentsByExpenses.current) {
      requestedPaymentsByExpenses.current = true
      request()
    }
  }, [idGroup, router])

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getPaymentsByUsersService(idGroup as string)
        setPaymentsByUsers(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (idGroup && !requestedPaymentsByUsers.current) {
      requestedPaymentsByUsers.current = true
      request()
    }
  }, [idGroup, router])

  const showNotFound =
    (selectedFilter === 'users' &&
      requestedPaymentsByUsers.current &&
      !paymentsByUsers?.length) ||
    (selectedFilter === 'expenses' &&
      requestedPaymentsByExpenses.current &&
      !paymentsByExpenses?.length)

  return (
    <s.Section>
      <h2>Resultados</h2>

      <s.Filters>
        <s.Filter onClick={() => setSelectedFilter('users')}>
          <s.Radio checked={selectedFilter === 'users'} />
          <s.Label>por usuários</s.Label>
        </s.Filter>

        <s.Filter onClick={() => setSelectedFilter('expenses')}>
          <s.Radio checked={selectedFilter === 'expenses'} />
          <s.Label>por despesas</s.Label>
        </s.Filter>
      </s.Filters>

      {selectedFilter === 'users' && (
        <PaymentsByUsers user={user} payments={paymentsByUsers} />
      )}

      {selectedFilter === 'expenses' && (
        <PaymentsByExpenses user={user} payments={paymentsByExpenses} />
      )}

      {showNotFound && (
        <s.NotFound>Nenhum resultado a ser exibido ainda.</s.NotFound>
      )}
    </s.Section>
  )
}
{
  /*  */
}
export default GroupPayments
