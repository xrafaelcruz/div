import GroupForm from 'components/GroupForm'

import * as t from './types'

export default function EditGroup({ user, group }: t.EditGroupProps) {
  return <GroupForm user={user} group={group} />
}
