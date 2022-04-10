import { useEffect, useState } from 'react'

import { getGroups } from 'services/group'

import { UseGroupProps, UseGroupReturn } from './types'
import { Group } from 'services/group/types'

const useGroup = ({ user }: UseGroupProps): UseGroupReturn => {
  const [groups, setGroups] = useState<Group[]>()

  useEffect(() => {
    const getListGroups = async () => {
      try {
        const list = await getGroups(user.id)

        if (list) {
          setGroups(list)
        }
      } catch (e) {
        console.log(e)
        alert(e)
        setGroups([])
      }
    }

    if (!groups) {
      getListGroups()
    }
  }, [groups, user])

  return { groups }
}

export default useGroup
