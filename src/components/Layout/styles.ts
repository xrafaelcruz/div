import styled from 'styled-components'
import { opacityAnimation } from 'styles/global'

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  padding: 48px 16px 0;
  margin: auto;
  max-width: 480px;
  width: 100%;

  > * {
    animation: ${opacityAnimation} 500ms;
  }
`

export const Main = styled.div`
  flex: 1;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  width: 100%;
`
