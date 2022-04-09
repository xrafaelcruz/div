import { useEffect, useState } from 'react'

import { listMembersOfGroup } from 'services/group'

import { UsMembersOfGroupReturn } from './types'
import { MemberOfGroup } from 'services/group/types'

const useMembersOfGroup = (initialIdGroup?: string): UsMembersOfGroupReturn => {
  const [membersOfGroup, setMembersOfGroup] = useState<MemberOfGroup[]>()

  const getMembersOfGroup = async (idGroup: string, excludeMember?: string) => {
    if (!idGroup) {
      setMembersOfGroup([])
    }

    try {
      const members = await listMembersOfGroup(idGroup)

      if (members) {
        setMembersOfGroup(
          members.filter((member) => member.userName !== excludeMember)
        )
      }
    } catch (e) {
      console.log(e)
      alert(e)
      setMembersOfGroup([])
    }
  }

  useEffect(() => {
    if (!membersOfGroup && initialIdGroup) {
      getMembersOfGroup(initialIdGroup)
    }
  }, [initialIdGroup, membersOfGroup])

  return { membersOfGroup, getMembersOfGroup }
}

export default useMembersOfGroup
