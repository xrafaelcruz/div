import useGroupInvites from 'services/group/hooks/useGroupInvites'
import { updateUserGroupInvitesService } from 'services/group'
import { InviteStatus } from 'lib/prisma/constants'

import Button from 'components/Button'
import Layout from 'components/Layout'

import * as s from './styles'
import * as t from './types'

const Notifications = ({ user }: t.NotificationsProps) => {
  const { invites, getInvites } = useGroupInvites({ user })

  const handleUpdateInvite = async (
    idUserGroup: string,
    status: keyof typeof InviteStatus
  ) => {
    try {
      await updateUserGroupInvitesService(idUserGroup, status)
      await getInvites()
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  return (
    <Layout user={user}>
      <s.Wrapper>
        <h1>Convites</h1>

        <s.List>
          {invites?.map((userGroup) => (
            <s.Item key={userGroup.id}>
              Grupo: <strong>{userGroup.group.name}</strong>
              <s.Owner>Enviado por {userGroup.group.ownerUserEmail}</s.Owner>
              <s.Buttons>
                <Button
                  type="button"
                  size="small"
                  variant="danger"
                  onClick={() => handleUpdateInvite(userGroup.id, 'canceled')}
                >
                  Recusar
                </Button>

                <Button
                  type="button"
                  size="small"
                  variant="primary"
                  onClick={() => handleUpdateInvite(userGroup.id, 'accept')}
                >
                  Aceitar
                </Button>
              </s.Buttons>
            </s.Item>
          ))}
        </s.List>
      </s.Wrapper>
    </Layout>
  )
}

export default Notifications
