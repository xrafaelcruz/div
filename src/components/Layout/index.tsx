import { PropsWithChildren } from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'

import { LayoutProps } from './types'

import * as s from './styles'

const Layout = ({
  children,
  user,
  hideBack,
  ...props
}: PropsWithChildren<LayoutProps>) => (
  <s.Wrapper>
    <Header hideBack={hideBack} />
    <s.Main>
      <s.Container {...props}>{children}</s.Container>
    </s.Main>
    <Footer user={user} />
  </s.Wrapper>
)

export default Layout
