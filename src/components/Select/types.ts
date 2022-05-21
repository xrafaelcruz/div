import { SelectHTMLAttributes } from 'react'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  optional?: boolean
  error?: string
}
