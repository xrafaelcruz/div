import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getGroupService } from 'services/group'

import { GroupDetails } from 'services/group/types'
import { UseGroupReturn, UseGroupProps } from './types'

const useGroup = ({ idGroup }: UseGroupProps): UseGroupReturn => {
  const requestedGroups = useRef(false)

  const router = useRouter()
  const [group, setGroup] = useState<GroupDetails>()

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getGroupService(idGroup)
        setGroup(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (!group && !requestedGroups.current) {
      requestedGroups.current = true
      request()
    }
  }, [idGroup, group, router])

  return { group }
}

export default useGroup
