import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getGroupService } from 'services/group'
import { GroupDetails } from 'services/group/types'

export default function useGetGroup() {
  const requestedGetGroup = useRef(false)

  const router = useRouter()
  const { idGroup } = router.query

  const [group, setGroup] = useState<GroupDetails>()

  useEffect(() => {
    const getGroup = async () => {
      const foundedGroup = await getGroupService(idGroup)
      setGroup(foundedGroup || undefined)
    }

    if (idGroup && !requestedGetGroup.current) {
      requestedGetGroup.current = true
      getGroup()
    }
  }, [idGroup])

  return {
    group
  }
}
