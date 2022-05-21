import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

export const SelectWrapper = styled.div<{ error: boolean }>`
  ${({ error, theme }) => css`
    background: ${theme.colors.darkGray1};
    border-radius: 5px;
    position: relative;

    &::after {
      bottom: 0;
      content: '▼';
      font-size: 12px;
      height: 15px;
      margin: auto;
      position: absolute;
      right: 16px;
      top: 0;
    }

    select {
      appearance: none;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 5px;
      color: ${theme.colors.white};
      cursor: pointer;
      font-size: 16px;
      height: 50px;
      padding: 12px 16px;
      position: relative;
      transition: border-color 250ms;
      width: 100%;
      z-index: 1;

      &::placeholder {
        color: ${theme.colors.gray1};
      }

      &:disabled {
        cursor: not-allowed;
        background: ${theme.colors.error};
      }

      option {
        background: ${theme.colors.darkGray1};
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

export const Error = styled.p`
  ${({ theme }) => css`
    font-size: 14px;
    color: ${theme.colors.error};
  `}
`
