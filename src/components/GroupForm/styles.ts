import styled from 'styled-components'
import LayoutOriginal from 'components/Layout'

export const Layout = styled(LayoutOriginal)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 0;
`

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 64px;
`

export const Fields = styled.fieldset`
  gap: 8px;
  flex: 1;
`
