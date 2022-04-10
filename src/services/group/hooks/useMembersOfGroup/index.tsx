import { useEffect, useState } from 'react'

import { listMembersOfGroup } from 'services/group'

import { UsMembersOfGroupReturn } from './types'
import { MemberOfGroup } from 'services/group/types'

const useMembersOfGroup = (initialIdGroup?: string): UsMembersOfGroupReturn => {
  const [membersOfGroup, setMembersOfGroup] = useState<MemberOfGroup[]>()

  const getMembersOfGroup = async (idGroup: string, excludeMember?: string) => {
    if (!idGroup) {
      setMembersOfGroup([])
      return []
    }

    try {
      const members = await listMembersOfGroup(idGroup)

      if (members) {
        const filteredMembers = members.filter(
          (member) => member.userName !== excludeMember
        )

        setMembersOfGroup(filteredMembers)

        return filteredMembers
      }
    } catch (e) {
      console.log(e)
      alert(e)
      setMembersOfGroup([])
      return []
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
