import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth/isAuthenticated'

import Expense from 'components/_pages/Expense'

import { ExpenseProps } from 'components/_pages/Expense/types'

export default function ExpensePage(props: ExpenseProps) {
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

  return {
    props: { user }
  }
}
