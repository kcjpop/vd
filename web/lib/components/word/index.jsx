import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { Layout } from '../common/Layout'
import { Word } from './Word'
import { fetchSingleWord } from '../../api'

export function Page() {
  const router = useRouter()
  const { word, dict } = router.query

  const { data, isLoading } = useQuery(['word', word, dict], () =>
    word ? fetchSingleWord(word, dict) : null,
  )

  return (
    <Layout navVariant="search">
      {isLoading && <p>Loading…</p>}
      {data && <Word word={data} />}
    </Layout>
  )
}
