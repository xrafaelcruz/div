import { ButtonProps } from './types'
import * as s from './styles'

const Button = ({ children, ...props }: ButtonProps) => (
  <s.Button {...props}>{children}</s.Button>
)

export default Button
