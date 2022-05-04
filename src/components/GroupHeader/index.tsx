import { convertToMoney } from 'utils/normalize'

import * as t from './types'
import * as s from './styles'

const GroupHeader = ({ group }: t.GroupHeaderProps) => (
  <s.Header>
    <h1>{group?.name}</h1>

    <s.UsersCount>
      {group?.users.length} {`membro${group?.users.length !== 1 ? 's' : ''}`}
    </s.UsersCount>

    <s.Total>{group?.total ? `${convertToMoney(group?.total)}` : ''}</s.Total>

    <s.Description>{group?.description}</s.Description>
  </s.Header>
)

export default GroupHeader
