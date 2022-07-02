import Head from 'next/head'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import useGetGroup from 'services/group/hooks/useGetGroup'
import useGetPaymentsByExpenses from 'services/expense/hooks/useGetPaymentsByExpenses'
import useGetPaymentsByUsers from 'services/expense/hooks/useGetPaymentsByUsers'

import Payments from 'components/_pages/Payments'

export default function PaymentsPage() {
  const { user } = useIsAuthenticated()
  const { group } = useGetGroup()
  const { paymentsByExpenses } = useGetPaymentsByExpenses()
  const { paymentsByUsers } = useGetPaymentsByUsers()

  return (
    <>
      <Head>
        <title>Grupo</title>
        <meta name="description" content="Pagamentos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && group && paymentsByExpenses && paymentsByUsers && (
        <Payments
          user={user}
          group={group}
          paymentsByExpenses={paymentsByExpenses}
          paymentsByUsers={paymentsByUsers}
        />
      )}
    </>
  )
}
