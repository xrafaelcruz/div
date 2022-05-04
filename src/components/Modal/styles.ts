import styled, { css } from 'styled-components'

export const Overlay = styled.div`
  ${({ theme }) => css`
    align-items: center;
    background: rgb(74 85 104 / 90%);
    display: flex;
    flex-direction: column;
    height: 100vh;
    left: 0;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 2;
  `}
`

export const Modal = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.darkGray2};
    border-radius: 5px;
    padding: 32px 20px 20px;
    max-width: 460px;
    width: calc(100% - 32px);
  `}
`

export const Text = styled.div`
  font-size: 22px;
  margin-bottom: 32px;
  text-align: center;
`

export const Buttons = styled.div`
  display: flex;
  gap: 20px;

  > button {
    flex: 1;
  }
`
