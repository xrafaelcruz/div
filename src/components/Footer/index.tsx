import { getAuth } from 'lib/auth/utils'
import { useRouter } from 'next/router'
import { FaUserFriends, FaPlus } from 'react-icons/fa'

import * as s from './styles'

const Footer = () => {
  const router = useRouter()
  const user = getAuth()

  return (
    <s.Footer>
      <s.Wrapper>
        <s.ButtonGroups type="button" onClick={() => router.push('/')}>
          <FaUserFriends />
          <s.GroupTitle>Grupos</s.GroupTitle>
        </s.ButtonGroups>

        <s.ButtonExpense
          type="button"
          onClick={() => router.push('/nova-despesa')}
        >
          <FaPlus />
        </s.ButtonExpense>

        <s.ButtonProfile
          type="button"
          onClick={() => router.push('/')}
          photo={user?.photo || ''}
        />
      </s.Wrapper>
    </s.Footer>
  )
}

export default Footer
