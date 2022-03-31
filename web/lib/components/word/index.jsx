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

  // @FIXME This could be translated using word and dict
  const opengraph = {
    title: `“${word}” tiếng Việt là gì?`,
  }

  return (
    <Layout navVariant="search" opengraph={opengraph}>
      {isLoading && <p>Loading…</p>}
      {data && <Word word={data} />}
    </Layout>
  )
}
