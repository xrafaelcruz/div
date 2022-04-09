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

export const NewMember = styled.div`
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

export const Members = styled.fieldset`
  margin: 24px 0 0;

  > button {
    align-self: center;
  }
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 8px;
  padding: 0;
  width: 100%;
`

export const Item = styled.li`
  ${({ theme }) => css`
    background: ${theme.colors.darkGray1};
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    padding: 16px;

    &:hover {
      filter: brightness(95%);
    }
  `}
`
