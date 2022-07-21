import { useRouter } from 'next/router'
import { FaUserFriends, FaPlus } from 'react-icons/fa'
import Link from 'next/link'

import * as s from './styles'
import * as t from './types'

const Footer = ({ user }: t.FooterProps) => {
  const router = useRouter()
  const { idGroup } = router.query

  const handleNewExpense = (e: any) => {
    e.preventDefault()

    if (router.pathname !== '/nova-despesa') {
      router.push(`/nova-despesa${idGroup ? `?idGroup=${idGroup}` : ''}`)
    }
  }

  return (
    <s.Footer>
      <s.Wrapper>
        <Link href="/" passHref>
          <s.ButtonGroups>
            <FaUserFriends />
            <s.GroupTitle>Grupos</s.GroupTitle>
          </s.ButtonGroups>
        </Link>

        <s.ButtonExpense
          href={`/nova-despesa${idGroup ? `?idGroup=${idGroup}` : ''}`}
          onClick={handleNewExpense}
        >
          <FaPlus aria-label="Nova despesa" />
        </s.ButtonExpense>

        <Link href="/perfil" passHref>
          <s.ButtonProfile
            type="button"
            photo={user?.photo || ''}
            aria-label="Perfil"
            onClick={() => router.push('/perfil')}
          />
        </Link>
      </s.Wrapper>
    </s.Footer>
  )
}

export default Footer
