type Params = {
  name?: string
  email: string
}

export const getUserName = (user: Params) =>
  user.name ? user.name : user.email
