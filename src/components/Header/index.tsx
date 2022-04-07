import { useRouter } from 'next/router'
import { FaLongArrowAltLeft } from 'react-icons/fa'

import { HeaderProps } from './types'

import * as s from './styles'

const Header = ({ hideBack }: HeaderProps) => {
  const router = useRouter()
  console.log('hideBack', hideBack)
  return (
    <s.Header>
      <s.Wrapper>
        {!hideBack && (
          <s.ButtonBack type="button" onClick={() => router.back()}>
            <FaLongArrowAltLeft />
          </s.ButtonBack>
        )}

        <h2>DIV</h2>
      </s.Wrapper>
    </s.Header>
  )
}

export default Header
