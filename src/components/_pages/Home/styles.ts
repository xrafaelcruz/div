import styled, { css } from 'styled-components'
import ButtonOriginal from 'components/Button'

export const Button = styled(ButtonOriginal)`
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
    cursor: pointer;
    font-size: 16px;
    padding: 8px 16px;

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
