import { useState } from 'react'

import PaymentsByExpenses from './PaymentsByExpenses'
import PaymentsByUsers from './PaymentsByUsers'

import * as t from './types'
import * as s from './styles'

const GroupPayments = ({
  user,
  paymentsByExpenses,
  paymentsByUsers
}: t.GroupPaymentsProps) => {
  const [selectedFilter, setSelectedFilter] = useState('users')

  const showNotFound =
    (selectedFilter === 'users' && !paymentsByUsers?.length) ||
    (selectedFilter === 'expenses' && !paymentsByExpenses?.length)

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
        <s.NotFound>Nenhum resultado a ser exibido ainda</s.NotFound>
      )}
    </s.Section>
  )
}

export default GroupPayments
