import styled, { css } from 'styled-components'

export const Header = styled.header`
  ${({ theme }) => css`
    background: ${theme.colors.darkGray1};
    display: flex;
    justify-content: center;
    width: 100%;
  `}
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: center;
  max-width: 480px;
  padding: 0 16px;
  position: relative;
  width: 100%;
`

export const ButtonBack = styled.button`
  ${({ theme }) => css`
    align-items: center;
    background: transparent;
    border: 0;
    bottom: 0;
    color: ${theme.colors.white};
    cursor: pointer;
    display: flex;
    left: 0;
    position: absolute;
    top: 0;
    transition: color 250ms;

    > svg {
      font-size: 32px;
    }

    &:hover {
      color: ${theme.colors.primary};
    }
  `}
`
