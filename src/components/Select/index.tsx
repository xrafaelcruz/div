import { forwardRef } from 'react'

import { SelectProps } from './types'

import * as s from './styles'

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, children, ...props }, ref) => (
    <s.Wrapper>
      <s.SelectWrapper error={!!error}>
        <select {...props} ref={ref}>
          {children}
        </select>
      </s.SelectWrapper>

      <s.Error>{error}</s.Error>
    </s.Wrapper>
  )
)

Select.displayName = 'Select'

export default Select
