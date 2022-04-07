import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { listGroups } from 'services/groups'

import Layout from 'components/Layout'

import { HomeProps } from './types'
import { UserGroupWithGroup } from 'services/groups/types'

import * as s from './styles'

export default function Home({ user }: HomeProps) {
  const [groups, setGroups] = useState<UserGroupWithGroup[]>()
  const router = useRouter()

  useEffect(() => {
    const getListGroups = async () => {
      try {
        const list = await listGroups(user.id, user.name)

        if (list) {
          setGroups(list)
        }
      } catch (e) {
        console.log(e)
        alert(e)
        setGroups([])
      }
    }

    if (!groups) {
      getListGroups()
    }
  }, [groups, user])

  return (
    <Layout hideBack={true}>
      <s.Button
        onClick={() => router.push('/novo-grupo')}
        type="button"
        variant="primary"
        size="big"
      >
        NOVO GRUPO
      </s.Button>

      <s.Groups>
        <h1>Grupos</h1>

        <s.List>
          {groups?.map((userGroup) => (
            <s.Item
              key={userGroup.id}
              onClick={() => router.push(`/grupo?id=${userGroup.group.id}`)}
            >
              {userGroup.group.name}
            </s.Item>
          ))}
        </s.List>
      </s.Groups>
    </Layout>
  )
}
