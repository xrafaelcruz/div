import { User } from 'services/user/types'
import { Group } from 'services/group/types'

export type UseGroupProps = {
  user: User
}

export type UseGroupReturn = {
  groups?: Group[]
  requested: boolean
}
