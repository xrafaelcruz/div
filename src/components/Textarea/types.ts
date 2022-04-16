import { TextareaHTMLAttributes } from 'react'

export type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string
}
