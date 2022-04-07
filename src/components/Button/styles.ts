import styled, { css } from 'styled-components'
import { ButtonProps } from './types'

export const variants = {
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
  `,

  danger: css`
    ${({ theme }) => css`
      background: ${theme.colors.error};
      color: ${theme.colors.white};
      height: 50px;
      text-transform: uppercase;
    `}
  `
}

export const sizes = {
  big: css`
    width: 170px;
  `,

  full: css`
    width: 100%;
  `,

  icon: css`
    align-items: center;
    border-radius: 50%;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 50px;
  `
}

export const buttonStyle = css`
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  transition: filter 250ms;

  &:hover {
    filter: brightness(85%);
  }

  &:active {
    filter: brightness(75%);
  }
`

export const Button = styled.button<ButtonProps>`
  ${({ variant, size }) => css`
    ${buttonStyle}
    ${variant && variants[variant]}
    ${size && sizes[size]}
  `}
`

export const FooterButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 32px;
  width: 100%;

  > * {
    flex: 1;
  }
`
