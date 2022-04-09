// import { User } from 'services/user/types'

let auth: any | undefined

export const setAuth = (newAuth: any): void => {
  auth = newAuth
}

export const getAuth = (): any | undefined => {
  return auth
}

export const clearAuth = (): void => {
  auth = undefined
}
