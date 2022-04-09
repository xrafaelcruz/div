import { useEffect, useState } from 'react'

import { listGroups } from 'services/group'

import { UseGroupsProps, UseGroupsReturn } from './types'
import { UserGroupComplete } from 'services/group/types'

const useUserGroups = ({ user }: UseGroupsProps): UseGroupsReturn => {
  const [userGroups, setUserGroups] = useState<UserGroupComplete[]>()

  useEffect(() => {
    const getListGroups = async () => {
      try {
        const list = await listGroups(user.id, user.name)

        if (list) {
          setUserGroups(list)
        }
      } catch (e) {
        console.log(e)
        alert(e)
        setUserGroups([])
      }
    }

    if (!userGroups) {
      getListGroups()
    }
  }, [userGroups, user])

  return { userGroups }
}

export default useUserGroups
