import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ error: boolean }>`
  ${({ theme, error }) => css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;

    textarea {
      background: ${theme.colors.darkGray1};
      border: 1px solid transparent;
      border-radius: 5px;
      color: ${theme.colors.white};
      font-size: 16px;
      min-height: 50px;
      padding: 12px 16px;
      resize: none;
      transition: border-color 250ms;
      width: 100%;

      &::placeholder {
        color: ${theme.colors.gray1};
      }

      ${error &&
      css`
        outline: 1px solid ${theme.colors.error};
        border-color: ${theme.colors.error};
      `}
    }
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.colors.white};
  `}
`
export const Optional = styled.label`
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
