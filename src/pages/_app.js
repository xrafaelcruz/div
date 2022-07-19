import { SessionProvider } from 'next-auth/react'
import App from '../components/App'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <App>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </App>
  )
}

export default MyApp
