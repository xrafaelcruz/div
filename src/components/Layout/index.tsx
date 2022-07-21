import { PropsWithChildren, useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import { getLoader, setLoader } from 'lib/loader'

import Header from 'components/Header'
import Footer from 'components/Footer'

import { LayoutProps } from './types'

import * as s from './styles'
import theme from 'styles/theme'

const Layout = ({
  children,
  hideBack,
  ...props
}: PropsWithChildren<LayoutProps>) => {
  const router = useRouter()

  const { user } = useIsAuthenticated()

  const ref = useRef<any>(null)
  useEffect(() => {
    if (!getLoader()) {
      setLoader(ref)
    }
  })

  if (router.route === '/login') {
    return children
  }

  return (
    <>
      <s.Wrapper>
        <Header hideBack={hideBack} />

        <s.Main id="main">
          <s.Container {...props}>{children}</s.Container>
        </s.Main>

        <Footer user={user} />
      </s.Wrapper>

      <LoadingBar color={theme.colors.primary} height={4} ref={ref} />
    </>
  )
}

export default Layout
