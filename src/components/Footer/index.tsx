import { useRouter } from 'next/router'
import { FaUserFriends, FaPlus } from 'react-icons/fa'

import * as s from './styles'

const Footer = () => {
  const router = useRouter()

  const photo =
    'https://lh3.googleusercontent.com/a-/AOh14GiWFydrF_uBf0v1cx8faIvncYpKjCCocWHgKt43sA=s96-c'

  return (
    <s.Footer>
      <s.Wrapper>
        <s.ButtonGroups type="button" onClick={() => router.push('/')}>
          <FaUserFriends />
          <s.GroupTitle>Grupos</s.GroupTitle>
        </s.ButtonGroups>

        <s.ButtonExpense type="button" onClick={() => router.push('/')}>
          <FaPlus />
        </s.ButtonExpense>

        <s.ButtonProfile
          type="button"
          onClick={() => router.push('/')}
          photo={photo}
        />
      </s.Wrapper>
    </s.Footer>
  )
}

export default Footer
