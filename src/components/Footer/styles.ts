import styled, { css } from 'styled-components'

export const Footer = styled.footer`
  ${({ theme }) => css`
    align-items: center;
    background: ${theme.colors.darkGray1};
    display: flex;
    justify-content: space-between;
    height: 40px;
    width: 100%;
  `}
`
