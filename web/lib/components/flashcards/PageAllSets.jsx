import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../common/Layout'
import { Loading } from '../common/Loading'
import { useUser } from '../../auth'

import { useAllSets } from './useAllSets'
import { Pagination } from './Pagination'

function chunk(array, size) {
  return array.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / size)

    return {
      ...acc,
      [chunkIndex + 1]: acc[chunkIndex + 1]
        ? [...acc[chunkIndex + 1], item]
        : [item],
    }
  }, {})
}

export function PageAllSets() {
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const router = useRouter()
  const { page } = router.query

  const { flashcardSets, isLoading } = useAllSets({ user, fetchAllSets: true })
  const [chunks, setChunks] = useState({})
  const currentPage = parseInt(page) || 1

  const next = (e) => {
    e.preventDefault()

    if (chunks[currentPage + 1]) {
      router.push(
        { pathName: router.pathname, query: { page: currentPage + 1 } },
        undefined,
        { shallow: true },
      )
    }
  }

  const prev = (e) => {
    e.preventDefault()

    if (chunks[currentPage - 1]) {
      router.push(
        { pathName: router.pathname, query: { page: currentPage - 1 } },
        undefined,
        { shallow: true },
      )
    }
  }

  useEffect(() => {
    if (flashcardSets && Array.isArray(flashcardSets)) {
      const collections = chunk(flashcardSets, 9)
      setChunks(collections)

      if (collections.length < currentPage) {
        router.push({ pathName: router.pathname }, undefined, { shallow: true })
      }
    }
  }, [flashcardSets])

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container">
        <Pagination
          chunks={chunks}
          currentPage={currentPage}
          next={next}
          prev={prev}
        />
      </div>
    </Layout>
  )
}
