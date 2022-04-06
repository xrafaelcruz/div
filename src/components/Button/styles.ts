import styled, { css } from 'styled-components'
import { ButtonProps } from './types'

const variants = {
  primary: css`
    ${({ theme }) => css`
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      height: 50px;
      text-transform: uppercase;
    `}
  `,

  secondary: css`
    ${({ theme }) => css`
      background: ${theme.colors.gray2};
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

export const Button = styled.button<ButtonProps>`
  ${({ variant, size }) => css`
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
  `}
`
