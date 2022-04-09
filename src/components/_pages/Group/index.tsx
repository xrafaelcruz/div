import Layout from 'components/Layout'

import { GroupProps } from './types'

import * as s from './styles'

export default function Group({ user }: GroupProps) {
  return (
    <Layout>
      <s.Main>
        <h1>grupo</h1>
      </s.Main>
    </Layout>
  )
}
