import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ error: boolean; type: any }>`
  ${({ theme, error, type }) => css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;

    input {
      background: ${theme.colors.darkGray1};
      border: 1px solid transparent;
      border-radius: 5px;
      color: ${theme.colors.white};
      font-size: 16px;
      height: 50px;
      padding: 12px 16px;
      transition: border-color 250ms;
      width: 100%;

      &[type='checkbox'] {
        all: unset;
        border: 2px solid ${theme.colors.primary};
        border-radius: 5px;
        display: inline-block;
        height: 24px;
        width: 24px;

        &:checked {
          background-color: ${theme.colors.primary};
        }

        &:checked + div {
          visibility: visible;
        }
      }

      &::placeholder {
        color: ${theme.colors.gray1};
      }

      ${error &&
      css`
        outline: 1px solid ${theme.colors.error};
        border-color: ${theme.colors.error};
      `}
    }

    ${type === 'checkbox' &&
    css`
      gap: 0;
    `}
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.colors.white};
  `}
`
export const Optional = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    font-size: 14px;
    color: ${theme.colors.error};
  `}
`

export const Check = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  visibility: hidden;
  position: absolute;
  width: 100%;
`
