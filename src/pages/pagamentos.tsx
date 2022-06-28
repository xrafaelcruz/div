import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'
import { getGroupService } from 'services/group'
import { getPaymentsService, getPaymentsByUsersService } from 'services/expense'

import Payments from 'components/_pages/Payments'

import { PaymentsProps } from 'components/_pages/Payments/types'

export default function PaymentsPage(props: PaymentsProps) {
  return (
    <>
      <Head>
        <title>Grupo</title>
        <meta name="description" content="Pagamentos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Payments {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)
  const group = await getGroupService(context)
  const paymentsByExpenses = await getPaymentsService(context)
  const paymentsByUsers = await getPaymentsByUsersService(context)

  return {
    props: { user, group, paymentsByExpenses, paymentsByUsers }
  }
}
