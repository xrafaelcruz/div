import { forwardRef } from 'react'
import { FaCheck } from 'react-icons/fa'

import { InputProps } from './types'

import * as s from './styles'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => (
    <s.Wrapper className={className} error={!!error}>
      <input {...props} ref={ref} />

      {error && <s.Error>{error}</s.Error>}

      {props.type === 'checkbox' && (
        <s.Check>
          <FaCheck />
        </s.Check>
      )}
    </s.Wrapper>
  )
)

Input.displayName = 'Input'

export default Input
