import { GroupInvite } from 'services/group/types'
import { User } from 'services/user/types'

export type NotificationsProps = {
  user: User
  invites: GroupInvite[]
}
