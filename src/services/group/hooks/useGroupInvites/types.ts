import { User } from 'services/user/types'
import { GroupInvite } from 'services/group/types'

export type UseGroupInvites = {
  user: User
}

export type UseGroupInvitesReturn = {
  invites?: GroupInvite[]
  getInvites: () => Promise<void>
}
