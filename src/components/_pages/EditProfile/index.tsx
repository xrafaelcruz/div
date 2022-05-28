import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from 'components/Button'
import Input from 'components/Input'
import Textarea from 'components/Textarea'

import { required } from 'utils/validations'
import { updateUserService } from 'services/user'

import * as s from './styles'
import * as t from './types'

export default function Profile({ user }: t.ProfileProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<t.FormData>({
    mode: 'onBlur',
    defaultValues: {
      name: user.name
    }
  })

  const onSubmit = async (data: t.FormData) => {
    try {
      await updateUserService({
        idUser: user.id,
        name: data.name,
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
          <s.InfoLabel>EMAIL</s.InfoLabel>
          <s.InfoValue>{user.email}</s.InfoValue>
        </s.Info>
      </s.Infos>

      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.Fields>
          <Input
            label="Nome"
            error={errors.name?.message}
            {...register('name', { required })}
          />

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
