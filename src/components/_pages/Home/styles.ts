import styled, { css } from 'styled-components'
import { ButtonLink } from 'components/Button'

export const Button = styled(ButtonLink)`
  align-self: center;
`

export const Groups = styled.div`
  display: flex;
  flex: 1;
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
    color: ${theme.colors.white};
    cursor: pointer;
    font-size: 16px;
    padding: 8px 16px;

    &:hover {
      filter: brightness(95%);
    }
  `}
`

export const Value = styled.p`
  ${({ theme }) => css`
    display: block;
    color: ${theme.colors.primary};
    font-size: 14px;
    margin-top: 4px;
  `}
`

export const Date = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 12px;
    word-break: normal;
  `}
`
export const DateValue = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`

export const NewGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Max = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 14px;
    text-align: center;
  `}
`

export const NotFound = styled.span`
  ${({ theme }) => css`
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: ${theme.colors.gray1};
    display: flex;
    flex: 1;
    justify-content: center;
    height: 100%;
    text-align: center;
  `}
`
