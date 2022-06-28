import { User } from 'services/user/types'
import { GroupDetails, UserGroup } from 'services/group/types'

export type UsersProps = {
  user: User
  group: GroupDetails
  usersGroup: UserGroup[]
}
