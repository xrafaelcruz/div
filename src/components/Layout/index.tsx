import Header from 'components/Header'
import Footer from 'components/Footer'

import * as s from './styles'

const PrivatePage: React.FC = ({ children }) => (
  <s.Wrapper>
    <Header />
    <s.Content>{children}</s.Content>
    <Footer />
  </s.Wrapper>
)

export default PrivatePage
