import { UserGroup } from 'services/group/types'

export type UseUsersGroupReturn = {
  usersGroup?: UserGroup[]
  getUsersGroup: (
    idGroup: string,
    excludeUser?: string
  ) => Promise<UserGroup[] | undefined>
}
