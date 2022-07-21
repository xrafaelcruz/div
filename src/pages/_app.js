import { SessionProvider } from 'next-auth/react'

import App from '../components/App'
import Layout from '../components/Layout'

import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <App>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </App>
  )
}

export default MyApp
