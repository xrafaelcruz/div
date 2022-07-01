import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'

import { getUsersGroupService } from 'services/group'

import { UseUsersGroupReturn } from './types'
import { UserGroup } from 'services/group/types'

const useGetUsersGroup = (initialIdGroup?: string): UseUsersGroupReturn => {
  const router = useRouter()

  const firstRequest = useRef(false)
  const [usersGroup, setUsersGroup] = useState<UserGroup[]>()

  const getUsersGroup = useCallback(
    async (idGroup: string, loggedUser?: string) => {
      if (!idGroup) {
        setUsersGroup([])
        return []
      }

      try {
        const userGroupArray = await getUsersGroupService(idGroup)

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
        router.push('/500')
      }
    },
    [router]
  )

  useEffect(() => {
    if (!firstRequest.current && initialIdGroup) {
      firstRequest.current = true
      getUsersGroup(initialIdGroup)
    }
  }, [initialIdGroup, firstRequest, getUsersGroup])

  return { usersGroup, getUsersGroup }
}

export default useGetUsersGroup
