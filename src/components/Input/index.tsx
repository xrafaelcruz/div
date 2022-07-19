import { forwardRef } from 'react'
import { FaCheck } from 'react-icons/fa'

import { InputProps } from './types'

import * as s from './styles'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, optional, error, className, ...props }, ref) => (
    <s.Wrapper className={className} error={!!error} type={props.type}>
      <s.Label htmlFor={id}>
        {label} {optional && <s.Optional>(Opcional)</s.Optional>}
      </s.Label>

      <input {...props} id={id} ref={ref} autoComplete="off" />

      {error && <s.Error>{error}</s.Error>}

      {props.type === 'checkbox' && (
        <s.Check>
          <FaCheck aria-label="Checkbox" />
        </s.Check>
      )}
    </s.Wrapper>
  )
)

Input.displayName = 'Input'

export default Input
