import { PropsWithChildren } from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'

import { LayoutProps } from './types'

import * as s from './styles'

const Layout = ({ children, hideBack }: PropsWithChildren<LayoutProps>) => (
  <s.Wrapper>
    <Header hideBack={hideBack} />
    <s.Content>{children}</s.Content>
    <Footer />
  </s.Wrapper>
)

export default Layout
