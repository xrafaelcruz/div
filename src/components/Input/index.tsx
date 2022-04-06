import { forwardRef } from 'react'

import { InputProps } from './types'

import * as s from './styles'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => (
    <s.Wrapper {...props} error={!!error}>
      <input {...props} ref={ref} />
      <s.Error>{error}</s.Error>
    </s.Wrapper>
  )
)

Input.displayName = 'Input'

export default Input
