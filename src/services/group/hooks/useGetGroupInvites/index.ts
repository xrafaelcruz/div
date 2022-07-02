import { useEffect, useRef, useState } from 'react'

import { getGroupInvitesService } from 'services/group'

import { GroupInvite } from 'services/group/types'
import { User } from 'services/user/types'

export default function useGetGroupInvites(user: User) {
  const requested = useRef(false)

  const [invites, setInvites] = useState<GroupInvite[]>()

  useEffect(() => {
    const getGroup = async () => {
      const foundedGroup = await getGroupInvitesService(user.email)
      setInvites(foundedGroup || [])
    }

    if (user && !requested.current) {
      requested.current = true
      getGroup()
    }
  }, [user])

  return {
    invites,
    setInvites
  }
}
