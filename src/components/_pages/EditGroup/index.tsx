import { useRouter } from 'next/router'

import GroupForm from 'components/GroupForm'

import useGroup from 'services/group/hooks/useGroup'

import * as t from './types'

export default function EditGroup({ user }: t.EditGroupProps) {
  const router = useRouter()
  const { id } = router.query

  const { group } = useGroup({
    idGroup: id as string,
    hasExpenses: true
  })

  return <>{group && <GroupForm user={user} group={group} />}</>
}
