import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { useAuth } from 'lib/auth/useAuth'
import { isAuthenticated } from 'lib/auth/isAuthenticated'

import NewExpense from 'components/_pages/NewExpense'

import { NewExpenseProps } from 'components/_pages/NewExpense/types'

export default function NewExpensePage(props: NewExpenseProps) {
  useAuth(props.user)
  return (
    <>
      <Head>
        <title>Nova despesa</title>
        <meta name="description" content="Nova despesa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewExpense {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  return {
    props: { user }
  }
}
