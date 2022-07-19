import { useRouter } from 'next/router'
import { FaLongArrowAltLeft, FaBell } from 'react-icons/fa'

import { HeaderProps } from './types'

import * as s from './styles'

const Header = ({ hideBack }: HeaderProps) => {
  const router = useRouter()

  return (
    <s.Header>
      <s.Wrapper>
        {!hideBack && (
          <s.ButtonBack
            type="button"
            aria-label="Voltar"
            onClick={() => router.back()}
          >
            <FaLongArrowAltLeft />
          </s.ButtonBack>
        )}

        <h2>DIV</h2>

        <s.ButtonNotification
          type="button"
          aria-label="Notificações"
          onClick={() => router.push('/notificacoes')}
        >
          <FaBell />
        </s.ButtonNotification>
      </s.Wrapper>
    </s.Header>
  )
}

export default Header
