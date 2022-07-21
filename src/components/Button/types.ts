import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary' | 'danger' | 'outlined'
  size?: 'small' | 'medium' | 'big' | 'full' | 'icon'
}

export type LinkProps = LinkHTMLAttributes<HTMLLinkElement> & {
  variant: 'primary' | 'secondary' | 'danger' | 'outlined'
  size?: 'small' | 'medium' | 'big' | 'full' | 'icon'
}
