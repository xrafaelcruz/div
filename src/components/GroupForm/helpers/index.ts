import { GroupFormProps, UserField } from '../types'
import * as t from './types'

export const getDefaultValues = ({
  user,
  group
}: GroupFormProps): t.GetDefaultValuesReturn => {
  let defaultUsers: UserField[] = []

  if (group) {
    defaultUsers = group.users
      .filter((currentUser) => currentUser.userEmail !== user.email)
      .map((currentUser) => ({
        id: currentUser.id,
        value: currentUser.userEmail
      }))
  }

  return {
    defaultValues: {
      name: group?.name || '',
      description: group?.description || '',
      emailLoggedUser: user.email
    },
    defaultUsers
  }
}
