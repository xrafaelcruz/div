import { toast } from 'react-toastify'

import useGetGroupInvites from 'services/group/hooks/useGetGroupInvites'
import { updateUserGroupInvitesService } from 'services/group'
import { InviteStatus } from 'lib/prisma/constants'
import { getLoader } from 'lib/loader'

import Button from 'components/Button'

import * as s from './styles'
import * as t from './types'

const Notifications = ({ user }: t.NotificationsProps) => {
  const { invites, setInvites } = useGetGroupInvites(user)

  const removeGroupFromList = (idUserGroup: string) => {
    setInvites((old) =>
      old?.filter((userGroup) => userGroup.id !== idUserGroup)
    )
  }

  const handleUpdateInvite = async (
    idUserGroup: string,
    status: keyof typeof InviteStatus
  ) => {
    try {
      getLoader()?.continuousStart()

      await updateUserGroupInvitesService(idUserGroup, status)

      removeGroupFromList(idUserGroup)
    } catch (e) {
      toast.error('Não foi possível executar essa operação')
    } finally {
      getLoader()?.complete()
    }
  }

  const hasInvites = !!invites?.length

  return (
    <>
      {invites && (
        <s.Wrapper>
          <h1>Convites</h1>

          {hasInvites && (
            <s.List>
              {invites.map((userGroup) => (
                <s.Item key={userGroup.id}>
                  <strong>{userGroup.group.name}</strong>

                  <s.Owner>
                    Enviado por {userGroup.group.ownerUserEmail}
                  </s.Owner>

                  <s.Buttons>
                    <Button
                      type="button"
                      size="small"
                      variant="danger"
                      onClick={() =>
                        handleUpdateInvite(userGroup.id, 'canceled')
                      }
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
          )}

          {!hasInvites && <s.NotFound>Você não possui convites</s.NotFound>}
        </s.Wrapper>
      )}
    </>
  )
}

export default Notifications
