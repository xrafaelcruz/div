import { User } from 'services/user/types'

let auth: any | undefined

export const setAuth = (newAuth: User): void => {
  auth = newAuth
}

export const getAuth = (): User | undefined => {
  return auth
}

export const clearAuth = (): void => {
  auth = undefined
}
