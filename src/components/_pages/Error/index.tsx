import { useRouter } from 'next/router'

import Button from 'components/Button'
import { FaExclamation } from 'react-icons/fa'

import * as s from './styles'

export default function ErrorPage() {
  const router = useRouter()

  return (
    <s.Wrapper>
      <s.Icon>
        <FaExclamation />
      </s.Icon>

      <h1>
        Ocorreu um problema
        <s.Contact>
          Contate o administrador do sistema rafaelcruzx@gmail.com
        </s.Contact>
      </h1>

      <Button
        variant="primary"
        size="big"
        type="button"
        onClick={() => router.push('/')}
      >
        Ir para a tela inicial
      </Button>
    </s.Wrapper>
  )
}
