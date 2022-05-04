import GroupForm from 'components/GroupForm'
import * as t from './types'

export default function NewGroup({ user }: t.NewGroupProps) {
  return <GroupForm user={user} />
}
