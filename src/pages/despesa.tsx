import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'
import { getExpenseService } from 'services/expense'
import { getGroupListService } from 'services/group'

import Expense from 'components/_pages/EditExpense'

import { EditExpenseProps } from 'components/_pages/EditExpense/types'

export default function EditExpensePage(props: EditExpenseProps) {
  return (
    <>
      <Head>
        <title>Despesa</title>
        <meta name="description" content="Detalhes da despesa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Expense {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)
  const expense = await getExpenseService(context)
  const groups = await getGroupListService(context, user?.email)

  return {
    props: { user, expense, groups }
  }
}
