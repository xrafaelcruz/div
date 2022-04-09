import { User } from 'services/user/types'
import { UserGroupComplete } from 'services/group/types'

export type UseGroupsProps = {
  user: User
}

export type UseGroupsReturn = {
  userGroups?: UserGroupComplete[]
}
