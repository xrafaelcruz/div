import styled, { css } from 'styled-components'

export const ExpenseList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 8px;
  margin-top: 8px;
  padding: 0;
  width: 100%;
`

export const ExpenseItem = styled.li`
  ${({ theme }) => css`
    background: ${theme.colors.darkGray1};
    border-radius: 5px;
    font-size: 16px;
    padding: 8px 16px;

    &:last-of-type {
      margin-bottom: 32px;
    }
  `}
`

export const ExpenseName = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 16px;
    font-weight: bold;
  `}
`

export const ExpensePayerUser = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 14px;
  `}
`

export const ExpenseValue = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: 14px;
  `}
`
