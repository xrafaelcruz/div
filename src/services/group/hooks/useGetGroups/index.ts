import { useEffect, useRef, useState } from 'react'

import { getGroupListService } from 'services/group'

import { Group } from 'services/group/types'
import { User } from 'services/user/types'

export default function useGetGroups(user: User) {
  const requested = useRef(false)
  const [groups, setGroups] = useState<Group[]>()

  useEffect(() => {
    const getGroups = async () => {
      const foundedGroups = await getGroupListService(user?.email)
      setGroups(foundedGroups || [])
    }

    if (user && !requested.current) {
      requested.current = true
      getGroups()
    }
  }, [user])

  return {
    groups
  }
}
