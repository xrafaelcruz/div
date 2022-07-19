import { useRouter } from 'next/router'
import { FaUserFriends, FaPlus } from 'react-icons/fa'

import * as s from './styles'
import * as t from './types'

const Footer = ({ user }: t.FooterProps) => {
  const router = useRouter()
  const { idGroup } = router.query

  const handleNewExpense = () => {
    if (router.pathname !== '/nova-despesa') {
      router.push(`/nova-despesa${idGroup ? `?idGroup=${idGroup}` : ''}`)
    }
  }

  return (
    <s.Footer>
      <s.Wrapper>
        <s.ButtonGroups type="button" onClick={() => router.push('/')}>
          <FaUserFriends />
          <s.GroupTitle>Grupos</s.GroupTitle>
        </s.ButtonGroups>

        <s.ButtonExpense type="button" onClick={handleNewExpense}>
          <FaPlus aria-label="Nova despesa" />
        </s.ButtonExpense>

        <s.ButtonProfile
          type="button"
          photo={user?.photo || ''}
          aria-label="Perfil"
          onClick={() => router.push('/perfil')}
        />
      </s.Wrapper>
    </s.Footer>
  )
}

export default Footer
