import styled, { css } from 'styled-components'

export const Header = styled.header`
  ${({ theme }) => css`
    align-items: center;
    background: ${theme.colors.darkGray1};
    display: flex;
    justify-content: center;
    height: 40px;
    width: 100%;
  `}
`
