import styled, { css } from 'styled-components'

export const Section = styled.section`
  flex: 1;
`

export const ExpenseList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 8px;
  margin-top: 8px;
  padding: 0;
  width: 100%;
`

export const ExpenseItem = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.darkGray1};
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    gap: 4px;
    padding: 8px 16px;

    &:last-of-type {
      margin-bottom: 32px;
    }

    &:hover {
      filter: brightness(95%);
    }
  `}
`

export const ExpenseName = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 16px;
    font-weight: bold;
  `}
`

export const ExpensePayerUser = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 14px;
  `}
`

export const ExpenseValue = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: 14px;
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
