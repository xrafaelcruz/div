import { GetServerSidePropsContext } from 'next'

export type TGetSSR = {
  context: GetServerSidePropsContext
  url: string
  requiredParams?: boolean
}
