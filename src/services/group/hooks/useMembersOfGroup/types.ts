import { MemberOfGroup } from 'services/group/types'

export type UsMembersOfGroupReturn = {
  membersOfGroup?: MemberOfGroup[]
  getMembersOfGroup: (idGroup: string, excludeMember?: string) => void
}
