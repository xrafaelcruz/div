import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary' | 'danger' | 'outlined'
  size?: 'big' | 'full' | 'icon'
}
