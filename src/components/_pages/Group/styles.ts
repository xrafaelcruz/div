import styled from 'styled-components'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const Fields = styled.fieldset`
  border: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`

export const NewMember = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  width: 100%;

  div {
    flex: 1;
  }
`

export const Members = styled.fieldset`
  border: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  margin: 32px 0 64px;
  width: 100%;

  > button {
    align-self: center;
  }
`
