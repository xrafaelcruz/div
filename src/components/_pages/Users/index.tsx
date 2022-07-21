import { useRouter } from 'next/router'

import Button from 'components/Button'
import GroupHeader from 'components/GroupHeader'
import GroupUsers from 'components/GroupUsers'

import * as s from './styles'
import * as t from './types'

export default function Users({ user, group, usersGroup }: t.UsersProps) {
  const router = useRouter()

  return (
    <s.Main>
      <GroupHeader group={group} user={user} />

      <s.Buttons>
        {user.email === group?.ownerUserEmail && (
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.push(`/editar-grupo?idGroup=${group.id}`)}
          >
            Editar
          </Button>
        )}
      </s.Buttons>

      <GroupUsers
        ownerUserEmail={group?.ownerUserEmail}
        usersGroup={usersGroup}
      />
    </s.Main>
  )
}
