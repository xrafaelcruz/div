import { useRouter } from 'next/router'

import useGroupList from 'services/group/hooks/useGroupList'

import Layout from 'components/Layout'

import { HomeProps } from './types'

import * as s from './styles'

export default function Home({ user }: HomeProps) {
  const router = useRouter()
  const { groups } = useGroupList({ user })

  return (
    <Layout hideBack={true}>
      <s.Button
        onClick={() => router.push('/novo-grupo')}
        type="button"
        variant="primary"
        size="big"
      >
        NOVO GRUPO
      </s.Button>

      <s.Groups>
        <h1>Grupos</h1>

        <s.List>
          {groups?.map((group) => (
            <s.Item
              key={group.id}
              onClick={() => router.push(`/grupo?id=${group.id}`)}
            >
              {group.name}
            </s.Item>
          ))}
        </s.List>
      </s.Groups>
    </Layout>
  )
}
