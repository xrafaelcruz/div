import { signOut } from 'next-auth/react'
import Layout from 'components/Layout'

import * as s from './styles'
import * as t from './types'
import Button from 'components/Button'

export default function Profile({ user }: t.ProfileProps) {
  return (
    <Layout user={user}>
      <s.Main>
        <h1>Perfil</h1>

        <s.Header>
          <s.Photo photo={user.photo} />
          <Button variant="outlined" onClick={() => signOut()}>
            Sair
          </Button>
        </s.Header>

        <s.Infos>
          <s.Info>
            <s.InfoLabel>NOME</s.InfoLabel>
            <s.InfoValue>{user.name}</s.InfoValue>
          </s.Info>

          <s.Info>
            <s.InfoLabel>EMAIL</s.InfoLabel>
            <s.InfoValue>{user.email}</s.InfoValue>
          </s.Info>

          {user.pix && (
            <s.Info>
              <s.InfoLabel>PIX</s.InfoLabel>
              <s.InfoValue>{user.pix}</s.InfoValue>
            </s.Info>
          )}

          {user.description && (
            <s.Info>
              <s.InfoLabel>DESCRIÇÃO</s.InfoLabel>
              <s.InfoValue>{user.description}</s.InfoValue>
            </s.Info>
          )}
        </s.Infos>
      </s.Main>
    </Layout>
  )
}
