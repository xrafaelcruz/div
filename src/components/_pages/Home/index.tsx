import { useRouter } from 'next/router'

import { convertToMoney } from 'utils/normalize'
import useGetGroups from 'services/group/hooks/useGetGroups'

import Layout from 'components/Layout'

import { HomeProps } from './types'

import * as s from './styles'

const groupsLimit = 5

export default function Home({ user }: HomeProps) {
  const router = useRouter()

  const { groups } = useGetGroups(user)

  if (!groups) return <></>

  const totalMyGroups =
    groups?.reduce(
      (total, group) =>
        group.ownerUserEmail == user.email ? total + 1 : total,
      0
    ) || 0

  const hasGroups = !!groups?.length

  return (
    <Layout user={user} hideBack={true}>
      <s.NewGroupWrapper>
        {totalMyGroups < groupsLimit && (
          <s.Button
            onClick={() => router.push('/novo-grupo')}
            type="button"
            variant="primary"
            size="medium"
          >
            NOVO GRUPO
          </s.Button>
        )}

        <s.Max>(Você pode criar no máximo {groupsLimit})</s.Max>
      </s.NewGroupWrapper>

      <s.Groups>
        {hasGroups && <h1>Grupos</h1>}

        {hasGroups && (
          <s.List>
            {groups?.map((group) => (
              <s.Item
                key={group.id}
                onClick={() => router.push(`/grupo?idGroup=${group.id}`)}
              >
                {group.name}
                <s.Value>{convertToMoney(group.total)}</s.Value>
              </s.Item>
            ))}
          </s.List>
        )}

        {!groups?.length && (
          <s.NotFound>Você não faz parte de nenhum</s.NotFound>
        )}
      </s.Groups>
    </Layout>
  )
}
