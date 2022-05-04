import { Dispatch, SetStateAction } from 'react'
import {
  UseFormWatch,
  UseFormRegister,
  UseFormUnregister,
  FieldError
} from 'react-hook-form'
import { UserField, FormData } from '../types'

export type UsersProps = {
  idGroup?: string
  isEdit: boolean
  users: UserField[]
  setUsers: Dispatch<SetStateAction<UserField[]>>
  defaultUsers: UserField[]
  watch: UseFormWatch<FormData>
  register: UseFormRegister<FormData>
  unregister: UseFormUnregister<FormData>
  errors: {
    name?: FieldError | undefined
    description?: FieldError | undefined
    emailLoggedUser?: FieldError | undefined
    email?:
      | {
          [x: string]: FieldError
        }
      | undefined
  }
}
