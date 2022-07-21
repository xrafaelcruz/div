import Link from 'next/link'

import { ButtonProps, LinkProps } from './types'
import * as s from './styles'

const Button = ({ children, ...props }: ButtonProps) => (
  <s.Button {...props}>{children}</s.Button>
)

export const ButtonLink = ({
  children,
  href,
  size,
  variant,
  className,
  ...props
}: LinkProps) => (
  <Link href={href || ''} {...props}>
    <a className={className}>
      <Button size={size} variant={variant}>
        {children}
      </Button>
    </a>
  </Link>
)

export default Button
