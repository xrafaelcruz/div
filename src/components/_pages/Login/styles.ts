import styled, { css } from 'styled-components'

export const Main = styled.main`
  ${({ theme }) => css`
    align-items: center;
    background: ${theme.colors.darkGray3};
    display: flex;
    flex-direction: column;
    gap: 64px;
    justify-content: center;

    h1 {
      text-align: center;
    }

    h2 {
      font-size: 24px;
    }
  `}
`

export const Wrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    background: ${theme.colors.darkGray2};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 96px;
    justify-content: center;
    min-height: 50vh;
    padding: 32px 16px 64px;
    width: 320px;
    max-width: 100%;
  `}
`
