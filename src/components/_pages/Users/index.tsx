import { useRouter } from 'next/router'

import useGroup from 'services/group/hooks/useGroup'

import Layout from 'components/Layout'
import Button from 'components/Button'
import GroupHeader from 'components/GroupHeader'
import GroupUsers from 'components/GroupUsers'

import * as s from './styles'
import * as t from './types'

export default function Users({ user }: t.UsersProps) {
  const router = useRouter()
  const { idGroup } = router.query

  const { group } = useGroup({
    idGroup: idGroup as string
  })

  return (
    <Layout user={user}>
      <s.Main>
        <GroupHeader group={group} user={user} />

        <s.Buttons>
          {user.email === group?.ownerUserEmail && (
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.push(`/editar-grupo?idGroup=${idGroup}`)}
            >
              Editar
            </Button>
          )}
        </s.Buttons>

        <GroupUsers ownerUserEmail={group?.ownerUserEmail} />
      </s.Main>
    </Layout>
  )
}
