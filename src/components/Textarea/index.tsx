import { forwardRef } from 'react'

import { TextareaProps } from './types'

import * as s from './styles'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, optional, error, className, rows = 2, ...props }, ref) => (
    <s.Wrapper className={className} error={!!error}>
      <s.Label htmlFor={id}>
        {label} {optional && <s.Optional>(Opcional)</s.Optional>}
      </s.Label>

      <textarea
        aria-label={label}
        {...props}
        ref={ref}
        rows={rows}
        autoComplete="off"
        maxLength={140}
      />

      {error && <s.Error>{error}</s.Error>}
    </s.Wrapper>
  )
)

Textarea.displayName = 'Textarea'

export default Textarea
