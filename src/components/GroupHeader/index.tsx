import * as t from './types'
import * as s from './styles'

const GroupHeader = ({ group }: t.GroupHeaderProps) => (
  <s.Header>
    <h1>{group?.details.name}</h1>
    <s.UsersCount>{group?.usersCount} membros</s.UsersCount>
    <p>{group?.total ? `Total ${group?.total}` : ''}</p>
  </s.Header>
)

export default GroupHeader
