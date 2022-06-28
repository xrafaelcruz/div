import { signIn } from 'next-auth/react'

import * as s from './styles'

const Login = () => (
  <s.Main>
    <h1>
      Div <br />
      Divisão fácil
    </h1>

    <s.Button
      onClick={() => signIn('google')}
      type="button"
      variant="primary"
      size="full"
    >
      FAZER LOGIN COM O GOOGLE
    </s.Button>
  </s.Main>
)

export default Login
