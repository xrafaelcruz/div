import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getGroupService } from 'services/group'
import { getLoader } from 'lib/loader'

import { GroupDetails } from 'services/group/types'

export default function useGetGroup() {
  const requestedGetGroup = useRef(false)

  const router = useRouter()
  const { idGroup } = router.query

  const [group, setGroup] = useState<GroupDetails>()

  useEffect(() => {
    const getGroup = async () => {
      getLoader()?.continuousStart()

      const foundedGroup = await getGroupService(idGroup)
      setGroup(foundedGroup || undefined)

      getLoader()?.complete()
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
