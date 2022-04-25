import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../common/Layout'
import { Loading } from '../common/Loading'
import { Button } from '../common/Button'
import { useUser } from '../../auth'
import { useTranslation } from '../../i18n'

import { useAllSets } from './useAllSets'
import { Sets } from './Sets'

export function PageAllSets({ page }) {
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const router = useRouter()
  const { _e } = useTranslation()
  const [currentPage, setCurrentPage] = useState(+page - 1)

  const { flashcardSets, isLoading } = useAllSets({
    user,
    fetchAllSets: true,
    perPage: 9,
    page: currentPage,
  })

  const next = (e) => {
    e.preventDefault()

    flashcardSets.length >= 9 && setCurrentPage(currentPage + 1)
    router.push(
      { pathName: router.pathname, query: { page: currentPage + 1 } },
      undefined,
      { shallow: true },
    )
  }

  const prev = (e) => {
    e.preventDefault()

    currentPage > 0 && setCurrentPage(currentPage - 1)
    router.push(
      { pathName: router.pathname, query: { page: currentPage + 1 } },
      undefined,
      { shallow: true },
    )
  }

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
        <Sets flashcardSets={flashcardSets} />
        <div className="mt-5 flex w-full flex-row items-center justify-center gap-5">
          <Button
            onClick={prev}
            disabled={currentPage === 0}
            className="mr-3 inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"></path>
            </svg>
            {_e('common.previous')}
          </Button>
          <Button
            onClick={next}
            disabled={flashcardSets.length < 9}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {_e('common.next')}
            <svg
              className="ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </Button>
        </div>
      </div>
    </Layout>
  )
}
