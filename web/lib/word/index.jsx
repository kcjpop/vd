import { useRouter } from 'next/router'

import { Layout } from '../common/Layout'
import { Word } from './Word'

export function Page() {
  const router = useRouter()

  return (
    <Layout>
      <Word word={router.query.word} />
    </Layout>
  )
}
