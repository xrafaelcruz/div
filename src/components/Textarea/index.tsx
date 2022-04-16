import { forwardRef } from 'react'

import { InputProps } from './types'

import * as s from './styles'

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ error, className, rows = 3, ...props }, ref) => (
    <s.Wrapper className={className} error={!!error}>
      <textarea {...props} ref={ref} rows={rows} />

      {error && <s.Error>{error}</s.Error>}
    </s.Wrapper>
  )
)

Textarea.displayName = 'Textarea'

export default Textarea
