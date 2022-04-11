import styled, { css } from 'styled-components'

export const Footer = styled.footer`
  ${({ theme }) => css`
    background: ${theme.colors.darkGray1};
    box-shadow: 0px 10px 22px ${theme.colors.black};
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 2;
  `}
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 50px;
  max-width: 480px;
  padding: 0 16px;
  width: 100%;
`

export const ButtonGroups = styled.button`
  ${({ theme }) => css`
    align-items: center;
    background: transparent;
    border: 0;
    color: ${theme.colors.white};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: color 250ms;

    > svg {
      font-size: 24px;
    }

    &:hover {
      color: ${theme.colors.primary};
    }
  `}
`

export const GroupTitle = styled.span`
  font-size: 14px;
`

export const ButtonExpense = styled.button`
  ${({ theme }) => css`
    align-items: center;
    background: transparent;
    border: 2px solid;
    border-radius: 50%;
    color: ${theme.colors.white};
    cursor: pointer;
    display: flex;
    padding: 6px;
    transition: color 250ms;

    > svg {
      font-size: 16px;
    }

    &:hover {
      color: ${theme.colors.primary};
    }
  `}
`

export const ButtonProfile = styled.button<{ photo: string }>`
  ${({ theme, photo }) => css`
    background: url(${photo}) no-repeat;
    background-color: ${theme.colors.white};
    background-position: center center;
    background-size: cover;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    height: 40px;
    width: 40px;
  `}
`
