import { GroupDetails } from 'services/group/types'
import { User } from 'services/user/types'

export type GroupHeaderProps = {
  group?: GroupDetails
  user: User
}
