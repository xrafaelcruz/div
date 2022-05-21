import { forwardRef } from 'react'

import { SelectProps } from './types'

import * as s from './styles'

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, optional, error, children, className, ...props }, ref) => (
    <s.Wrapper className={className}>
      <s.Label htmlFor={id}>
        {label} {optional && <s.Optional>(Opcional)</s.Optional>}
      </s.Label>

      <s.SelectWrapper error={!!error}>
        <select {...props} ref={ref}>
          {children}
        </select>
      </s.SelectWrapper>

      {error && <s.Error>{error}</s.Error>}
    </s.Wrapper>
  )
)

Select.displayName = 'Select'

export default Select
