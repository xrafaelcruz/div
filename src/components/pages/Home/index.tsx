import { useRouter } from 'next/router'

import Layout from 'components/Layout'
import Button from 'components/Button'

import { HomeProps } from './types'

import * as s from './styles'

export default function Home(props: HomeProps) {
  const router = useRouter()

  console.log('props', props)
  // Buscar grupos

  return (
    <Layout>
      <s.Main>
        <Button
          onClick={() => router.push('/novo-grupo')}
          type="button"
          variant="primary"
          size="big"
        >
          NOVO GRUPO
        </Button>
      </s.Main>
    </Layout>
  )
}
