import styled, { css } from 'styled-components'
import LayoutOriginal from 'components/Layout'

export const Layout = styled(LayoutOriginal)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 0;
`

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 32px;
`

export const Fields = styled.fieldset`
  flex: 1;
`

export const NewUser = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  width: 100%;

  div {
    flex: 1;
  }
`

export const PayerUser = styled.fieldset`
  margin: 24px 0 0;
`

export const Users = styled.fieldset`
  margin: 24px 0 0;

  > button {
    align-self: center;
  }
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 8px;
  padding: 0;
  width: 100%;
`

export const Label = styled.label`
  ${({ theme }) => css`
    align-items: center;
    background: ${theme.colors.darkGray1};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 16px;
    max-width: 100%;

    &:hover {
      filter: brightness(95%);
    }

    > span {
      max-width: 360px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `}
`

export const ValuePerUser = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 16px;
    font-weight: bold;
    margin: 32px 0;
    text-align: center;

    span {
      color: ${theme.colors.primary};
      display: block;
      font-size: 24px;
    }
  `}
`
