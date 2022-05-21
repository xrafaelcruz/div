import { useEffect, useState } from 'react'

import { listUsersGroup } from 'services/group'

import { UseUsersGroupReturn } from './types'
import { UserGroup } from 'services/group/types'

const useUsersGroup = (initialIdGroup?: string): UseUsersGroupReturn => {
  const [usersGroup, setUsersGroup] = useState<UserGroup[]>()

  const getUsersGroup = async (idGroup: string, loggedUser?: string) => {
    if (!idGroup) {
      setUsersGroup([])
      return []
    }

    try {
      const userGroupArray = await listUsersGroup(idGroup)

      if (userGroupArray) {
        let firstUser: UserGroup | undefined = undefined

        const filteredUsers = userGroupArray.filter((userGroup) => {
          const isLoggedUser = userGroup.userEmail === loggedUser

          if (isLoggedUser) {
            firstUser = userGroup
          }

          return !isLoggedUser
        })

        if (firstUser) {
          filteredUsers.unshift(firstUser)
        }

        setUsersGroup(filteredUsers)

        return filteredUsers
      }
    } catch (e) {
      console.log(e)
      alert(e)
      setUsersGroup([])
      return []
    }
  }

  useEffect(() => {
    if (!usersGroup && initialIdGroup) {
      getUsersGroup(initialIdGroup)
    }
  }, [initialIdGroup, usersGroup])

  return { usersGroup, getUsersGroup }
}

export default useUsersGroup
