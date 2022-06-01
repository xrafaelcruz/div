import { useEffect, useState, useRef, useCallback } from 'react'

import { getGroupInvitesService } from 'services/group'

import { GroupInvite } from 'services/group/types'
import * as t from './types'

const useGroupInvites = ({
  user
}: t.UseGroupInvites): t.UseGroupInvitesReturn => {
  const requestedList = useRef(false)

  const [invites, setInvites] = useState<GroupInvite[]>()

  const getInvites = useCallback(async () => {
    try {
      const groupInvites = await getGroupInvitesService(user.email)

      if (groupInvites) {
        setInvites(groupInvites)
      }
    } catch (e) {
      console.log(e)
      alert(e)
      setInvites([])
    }
  }, [user.email])

  useEffect(() => {
    if (!invites && !requestedList.current) {
      requestedList.current = true
      getInvites()
    }
  }, [getInvites, invites])

  return { invites, getInvites, requested: requestedList.current }
}

export default useGroupInvites
