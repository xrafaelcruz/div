import { UserGroup } from 'services/group/types'

export type GroupUsersProps = {
  ownerUserEmail?: string
  usersGroup: UserGroup[]
}
