import styled, { css } from 'styled-components'

export const Wrapper = styled.section`
  align-items: center;
  display: flex;
  height: 100vh;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  text-align: center;
  width: 100%;

  h1 {
    font-size: 20px;
  }
`

export const Icon = styled.div`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.error};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 20px;
    font-size: 30px;
  `}
`

export const Contact = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    display: block;
    font-size: 16px;
    font-weight: normal;
  `}
`
