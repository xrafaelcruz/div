import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

import { User } from 'services/user/types'
import { createUserService, getUserByEmailService } from 'services/user'
import { useRouter } from 'next/router'

const useIsAuthenticated = () => {
  const requested = useRef(false)
  const router = useRouter()

  const isLogin = router.route === '/login'

  const [user, seUser] = useState<User>()

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    }
  })

  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    const createUser = async (currentSession: Session) => {
      try {
        if (
          currentSession.user &&
          currentSession.user.email &&
          currentSession.user.name
        ) {
          const createdUser = await createUserService({
            email: currentSession.user.email,
            name: currentSession.user.name || '',
            description: '',
            password: '',
            photo: currentSession.user.image || '',
            pix: ''
          })

          if (createdUser) {
            seUser(createdUser)
          }
        }
      } catch (e) {
        window.location.href = '/login'
      }
    }

    const getUser = async (currentSession: Session) => {
      if (currentSession && currentSession.user) {
        let foundedUser: User | null = null

        try {
          if (currentSession.user.email) {
            foundedUser = await getUserByEmailService(currentSession.user.email)
          }
        } catch (e) {
          window.location.href = '/login'
        }

        if (!foundedUser?.email) {
          createUser(currentSession)
        } else {
          foundedUser.photo = currentSession.user.image || foundedUser.photo
          seUser(foundedUser)
        }
      }
    }

    if (!isLogin && isAuthenticated && session && !requested.current) {
      requested.current = true
      getUser(session)
    }
  }, [isLogin, isAuthenticated, session])

  return {
    user
  }
}

export default useIsAuthenticated
