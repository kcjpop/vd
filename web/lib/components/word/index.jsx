import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { fetchSingleWord } from '@/lib/api'
import { useTranslation } from '@/lib/i18n'
import { recentlyViewedWords } from '@/lib/storage'

import { Layout } from '../common/Layout'
import { Spinner } from '../common/Spinner'
import { Word } from './Word'

function Error({ err }) {
  const { _e } = useTranslation()
  return (
    <div className="rounded bg-red-200 p-4 shadow-sm">
      <p className="font-bold text-red-700">{_e('error.title')}</p>
      <p className="text-red-700">{err.message}</p>
    </div>
  )
}

export function Page({ opengraph, entry }) {
  const { _e } = useTranslation()
  const router = useRouter()
  const { word, dict } = router.query

  const { data, isLoading, isError } = useQuery(
    ['word', word, dict],
    () => entry ?? fetchSingleWord(word, dict),
    { retry: 2 },
  )

  // 🚨: Set to recently viewed words
  useEffect(() => {
    if (data) recentlyViewedWords().set(data.word)
  }, [data])

  return (
    <Layout navVariant="search" opengraph={opengraph}>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}

      {isError && (
        <Error err={{ message: _e('error.wordNotFound', { word }) }} />
      )}

      {data && <Word word={data} />}
    </Layout>
  )
}
