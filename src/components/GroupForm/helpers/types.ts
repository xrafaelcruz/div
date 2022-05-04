import { FormData, UserField } from '../types'

export type GetDefaultValuesReturn = {
  defaultValues: Partial<FormData>
  defaultUsers: UserField[]
}
