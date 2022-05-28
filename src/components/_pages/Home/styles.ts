import styled, { css } from 'styled-components'
import ButtonOriginal from 'components/Button'

export const Button = styled(ButtonOriginal)`
  align-self: center;
`

export const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 8px;
  margin-bottom: 32px;
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

export const Value = styled.span`
  ${({ theme }) => css`
    display: block;
    color: ${theme.colors.primary};
    font-size: 14px;
    margin-top: 4px;
  `}
`
