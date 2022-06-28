import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>

      <ToastContainer />
    </ThemeProvider>
  )
}

export default MyApp
