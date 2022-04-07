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
      }
    }

    getListGroups()
  }, [])

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

      <h1>Grupos</h1>

      {groups?.map((userGroup) => (
        <div key={userGroup.id}>{userGroup.group.name}</div>
      ))}
    </Layout>
  )
}
