import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../common/Layout'
import { Loading } from '../common/Loading'
import { Button } from '../common/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../common/Icons'
import { useUser } from '../../auth'
import { useTranslation } from '../../i18n'

import { useAllSets } from './useAllSets'
import { Sets } from './Sets'

const PER_PAGE = 9

export function PageAllSets({ page }) {
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const router = useRouter()
  const { _e } = useTranslation()
  const [currentPage, setCurrentPage] = useState(Number(page) - 1)

  const { flashcardSets, isLoading } = useAllSets({
    user,
    fetchAllSets: true,
    perPage: PER_PAGE,
    page: currentPage,
  })

  const next = (e) => {
    e.preventDefault()

    flashcardSets.length >= 9 && setCurrentPage(currentPage + 1)
    router.push(
      { pathName: router.pathname, query: { page: currentPage + 2 } },
      undefined,
      { shallow: true },
    )
  }

  const prev = (e) => {
    e.preventDefault()

    currentPage > 0 && setCurrentPage(currentPage - 1)
    router.push(
      { pathName: router.pathname, query: { page: currentPage } },
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
            className="mr-3 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <ArrowLeftIcon className="h-5 w-5" />
            {_e('common.previous')}
          </Button>
          <Button
            onClick={next}
            disabled={flashcardSets.length < PER_PAGE}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {_e('common.next')}
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Layout>
  )
}
