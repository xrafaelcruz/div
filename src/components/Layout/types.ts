import { User } from 'services/user/types'

export type NewExpenseProps = {
  user: User
}

export type LayoutProps = {
  user?: User
  hideBack?: boolean
}
