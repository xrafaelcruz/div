import styled, { css } from 'styled-components'
import ButtonOriginal from 'components/Button'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
    font-size: 16px;
    padding: 16px;
  `}
`

export const Owner = styled.span`
  ${({ theme }) => css`
    display: block;
    color: ${theme.colors.gray1};
    font-size: 14px;
    margin-top: 4px;
  `}
`

export const Button = styled(ButtonOriginal)`
  align-self: center;
`

export const Buttons = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
`
