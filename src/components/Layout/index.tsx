import { PropsWithChildren, useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import { getLoader, setLoader } from 'lib/loader'

import Header from 'components/Header'
import Footer from 'components/Footer'

import { LayoutProps } from './types'

import * as s from './styles'

const Layout = ({
  children,
  hideBack,
  ...props
}: PropsWithChildren<LayoutProps>) => {
  const { user } = useIsAuthenticated()

  const ref = useRef<any>(null)
  useEffect(() => {
    if (!getLoader()) {
      setLoader(ref)
    }
  })

  return (
    <>
      <s.Wrapper>
        <Header hideBack={hideBack} />
        <s.Main>
          <s.Container {...props}>{children}</s.Container>
        </s.Main>
        <Footer user={user} />
      </s.Wrapper>

      <LoadingBar color="#07d962" height={4} ref={ref} />
    </>
  )
}

export default Layout
