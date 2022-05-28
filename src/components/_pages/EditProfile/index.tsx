import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Layout from 'components/Layout'
import Button from 'components/Button'
import Input from 'components/Input'
import Textarea from 'components/Textarea'

import * as s from './styles'
import * as t from './types'
import { updateUserService } from 'services/user'

export default function Profile({ user }: t.ProfileProps) {
  const router = useRouter()

  const { register, handleSubmit } = useForm<t.FormData>({
    mode: 'onBlur'
  })

  const onSubmit = async (data: t.FormData) => {
    try {
      await updateUserService({
        idUser: user.id,
        pix: data.pix,
        description: data.description
      })

      router.back()
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  return (
    <s.Layout user={user}>
      <h1>Editar Perfil</h1>

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

      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.Fields>
          <Input label="PIX" optional {...register('pix')} />

          <Textarea
            label="Descrição"
            optional
            maxLength={500}
            {...register('description')}
          />
        </s.Fields>

        <Button type="submit" variant="primary" size="full">
          SALVAR
        </Button>
      </s.Form>
    </s.Layout>
  )
}
