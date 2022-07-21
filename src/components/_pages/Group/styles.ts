import styled from 'styled-components'
import { ButtonLink } from 'components/Button'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Button = styled(ButtonLink)`
  align-self: center;
`

export const Header = styled.section``

export const Buttons = styled.nav`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: space-between;

  > * {
    flex: 1;
  }
`
