import styled, { css } from 'styled-components'

export const Main = styled.main`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 32px;
  `}
`
