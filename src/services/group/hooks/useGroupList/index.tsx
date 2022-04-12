import { useEffect, useState, useRef } from 'react'

import { getGroupListService } from 'services/group'

import { UseGroupProps, UseGroupReturn } from './types'
import { Group } from 'services/group/types'

const useGroupList = ({ user }: UseGroupProps): UseGroupReturn => {
  const requestedList = useRef(false)

  const [groups, setGroups] = useState<Group[]>()

  useEffect(() => {
    const getGroupList = async () => {
      try {
        const list = await getGroupListService(user.id)

        if (list) {
          setGroups(list)
        }
      } catch (e) {
        console.log(e)
        alert(e)
        setGroups([])
      }
    }

    if (!groups && !requestedList.current) {
      requestedList.current = true
      getGroupList()
    }
  }, [groups, user])

  return { groups }
}

export default useGroupList
