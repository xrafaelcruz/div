import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

const App = ({ children }: any) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}

    <ToastContainer />
  </ThemeProvider>
)

export default App
