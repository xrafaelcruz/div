import { LinkProps } from './types'
import * as s from './styles'

import NextLink from 'next/link'

const Link = ({ children, href, ...props }: LinkProps) => (
  <s.Link href={href} {...props}>
    <a>{children}aa</a>
  </s.Link>
)

export default Link
