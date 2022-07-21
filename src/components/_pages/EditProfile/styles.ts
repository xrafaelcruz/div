import styled, { css } from 'styled-components'

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 0;
`

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 16px;

  > button {
    width: 100px;
  }
`

export const Photo = styled.div<{ photo: string }>`
  ${({ theme, photo }) => css`
    background: url(${photo}) no-repeat;
    background-color: ${theme.colors.white};
    background-position: center center;
    background-size: cover;
    border: 0;
    border-radius: 5px;
    height: 100px;
    width: 100px;
  `}
`

export const Infos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`

export const InfoLabel = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  `}
`

export const InfoValue = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 16px;
    font-weight: bold;
  `}
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Fields = styled.fieldset`
  gap: 8px;
`
