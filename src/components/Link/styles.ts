import styled, { css } from 'styled-components'
import NextLink from 'next/link'

import { LinkProps } from './types'

const variants = {
  primary: css`
    ${({ theme }) => css`
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      height: 50px;
      text-transform: uppercase;
    `}
  `
}

const sizes = {
  big: css`
    width: 170px;
  `,

  full: css`
    width: 100%;
  `
}

export const Link = styled(NextLink)<LinkProps>`
  ${({ variant, size }) => css`
    a {
      border: 0;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      padding: 8px;
      transition: filter 250ms;

      &:hover {
        filter: brightness(85%);
      }

      &:active {
        filter: brightness(75%);
      }

      ${variant && variants[variant]}
      ${size && sizes[size]}
    }
  `}
`
