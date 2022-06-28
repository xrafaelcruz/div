import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'
import { getGroupListService } from 'services/group'

import NewExpense from 'components/_pages/NewExpense'

import { NewExpenseProps } from 'components/_pages/NewExpense/types'

export default function NewExpensePage(props: NewExpenseProps) {
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
  // const groups = await getGroupListService(context, user?.email)

  return {
    props: { user, groups: null }
  }
}
