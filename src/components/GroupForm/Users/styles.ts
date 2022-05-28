import styled, { css } from 'styled-components'

export const NewUser = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  width: 100%;

  div {
    flex: 1;
  }
`

export const Users = styled.fieldset`
  margin-top: 24px;

  > button {
    align-self: center;
  }
`

export const Max = styled.label`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 14px;
  `}
`
