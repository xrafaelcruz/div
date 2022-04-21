import { convertToMoney } from 'utils/normalize'

import * as t from './types'
import * as s from './styles'

const GroupHeader = ({ group }: t.GroupHeaderProps) => (
  <s.Header>
    <h1>{group?.details.name}</h1>

    <s.UsersCount>
      {group?.usersCount} {`membro${group?.usersCount !== 1 ? 's' : ''}`}
    </s.UsersCount>

    <s.Total>{group?.total ? `${convertToMoney(group?.total)}` : ''}</s.Total>

    <s.Description>{group?.details.description}</s.Description>
  </s.Header>
)

export default GroupHeader
