import styled, { css } from 'styled-components'

export const Section = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 8px;
  margin-top: 8px;
  padding: 0;
  width: 100%;
`

export const Item = styled.li`
  ${({ theme }) => css`
    background: ${theme.colors.darkGray1};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 12px 16px;

    &:last-of-type {
      margin-bottom: 32px;
    }
  `}
`

export const Highlight = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 16px;
    font-weight: bold;
  `}
`

export const Text = styled.p<{ status?: string }>`
  ${({ theme, status }) => css`
    color: ${theme.colors.gray1};
    font-size: 16px;

    ${status === 'style1' &&
    css`
      text-decoration: line-through;
    `}

    ${status === 'style2' &&
    css`
      > span:first-of-type {
        color: ${theme.colors.orange};
      }
    `}

    ${status === 'style3' &&
    css`
      > span:first-of-type {
        color: ${theme.colors.primary};
      }
    `}

    ${status === 'style4' &&
    css`
      > span:first-of-type {
        color: ${theme.colors.white};
      }
    `}
  `}
`

export const PaymentValue = styled.span`
  font-size: 14px;
  font-weight: bold;
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

export const Filters = styled.div`
  display: flex;
  gap: 18px;
  margin: 8px 0 32px;
`

export const Filter = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 8px;
`

export const Radio = styled.div<{ checked: boolean }>`
  ${({ theme, checked }) => css`
    align-items: center;
    border: 2px solid ${theme.colors.white};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    height: 24px;
    width: 24px;

    &::after {
      background: ${checked ? theme.colors.primary : 'transparent'};
      border-radius: 50%;
      content: '';
      display: block;
      height: 70%;
      width: 70%;
    }
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    cursor: pointer;
    font-size: 18px;
  `}
`
