import styled, { css } from 'styled-components'

export const Section = styled.section`
  flex: 1;
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
      > span {
        color: ${theme.colors.orange};
      }
    `}

    ${status === 'style3' &&
    css`
      > span {
        color: ${theme.colors.primary};
      }
    `}

    ${status === 'style4' &&
    css`
      > span {
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
  `}
`
