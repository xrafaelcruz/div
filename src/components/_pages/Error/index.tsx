import { ButtonLink } from 'components/Button'
import { FaExclamation } from 'react-icons/fa'

import * as s from './styles'

export default function ErrorPage() {
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

      <ButtonLink variant="primary" size="big" href="/">
        Ir para a tela inicial
      </ButtonLink>
    </s.Wrapper>
  )
}
