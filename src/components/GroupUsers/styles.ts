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
    border: 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 8px;

    &:last-of-type {
      margin-bottom: 32px;
    }
  `}
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`

export const Info = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 14px;
    font-weight: 400;
  `}
`

export const OBS = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
    font-size: 12px;
    font-weight: 300;
    font-style: italic;
  `}
`

export const Label = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray1};
  `}
`

export const Image = styled.img`
  object-fit: cover;
  border-radius: 5px;
  height: 70px;
  width: 70px;
`
