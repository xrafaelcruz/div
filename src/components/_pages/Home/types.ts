import { User } from 'services/user/types'
import { Group } from 'services/group/types'

export type HomeProps = {
  user: User
  groups?: Group[]
  requested: boolean
}
