import styled, { css } from 'styled-components'

export const Header = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 32px;

  > button {
    min-width: 150px;
  }
`

export const UsersCount = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 14px;
  `}
`

export const Total = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: 14px;
  `}
`

export const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 16px;
    font-style: italic;
  `}
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
