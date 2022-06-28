import styled, { css } from 'styled-components'
import OriginalButton from 'components/Button'

export const Main = styled.main`
  ${({ theme }) => css`
    align-items: center;
    background: ${theme.colors.darkGray3};
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: center;

    h1 {
      text-align: center;
    }
  `}
`

export const Button = styled(OriginalButton)`
  max-width: 300px;
  width: 100%;
`
