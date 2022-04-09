import { useEffect } from 'react'
import { setAuth, getAuth } from 'lib/auth/utils'
import { User } from 'services/user/types'

export const useAuth = (user: User) => {
  useEffect(() => {
    console.log(getAuth())
    if (!getAuth()) {
      setAuth(user)
    }
  }, [user])
}
