import { signIn } from 'next-auth/react'

import Button from 'components/Button'

import * as s from './styles'

const Login = () => {
  const handleSignin = () => {
    signIn()
  }

  return (
    <s.Main>
      <h1>
        Div <br />
        Divisão fácil
      </h1>

      <s.Wrapper>
        <h2>Login</h2>

        <Button
          onClick={handleSignin}
          type="button"
          variant="primary"
          size="big"
        >
          ENTRAR
        </Button>
      </s.Wrapper>
    </s.Main>
  )
}

export default Login
