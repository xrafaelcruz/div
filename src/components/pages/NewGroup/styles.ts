import styled, { css } from 'styled-components'

export const Main = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 32px;
  `}
`

export const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `}
`

export const Fields = styled.fieldset`
  ${({ theme }) => css`
    border: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    flex: 1;
  `}
`

export const NewMember = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 16px;
    justify-content: space-between;
    width: 100%;

    div {
      flex: 1;
    }
  `}
`

export const Buttons = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 16px;
    justify-content: space-between;
    width: 100%;

    > * {
      flex: 1;
    }
  `}
`
