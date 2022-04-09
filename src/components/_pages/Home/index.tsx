import { useRouter } from 'next/router'

import useUserGroups from 'services/group/hooks/useUserGroups'

import Layout from 'components/Layout'

import { HomeProps } from './types'

import * as s from './styles'

export default function Home({ user }: HomeProps) {
  const router = useRouter()
  const { userGroups } = useUserGroups({ user })

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
          {userGroups?.map((userGroup) => (
            <s.Item
              key={userGroup.id}
              onClick={() => router.push(`/grupo?id=${userGroup.group.id}`)}
            >
              {userGroup.group.name}
            </s.Item>
          ))}
        </s.List>
      </s.Groups>
    </Layout>
  )
}
