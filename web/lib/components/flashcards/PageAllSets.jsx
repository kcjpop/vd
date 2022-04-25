import { useState } from 'react'
import { useRouter } from 'next/router'

import { useUser } from '@/lib/auth'
import { useTranslation } from '@/lib/i18n'

import { Layout } from '../common/Layout'
import { Breadcrumb } from '../common/Breadcrumb'
import { Button } from '../common/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../common/Icons'

import { useAllSets } from './useAllSets'
import { Sets } from './Sets'

const PER_PAGE = 9

export function PageAllSets({ page }) {
  const { _e } = useTranslation()
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(Number(page))

  const { flashcardSets, isLoading } = useAllSets({
    user,
    fetchAllSets: true,
    perPage: PER_PAGE,
    page: currentPage,
  })

  const next = (e) => {
    e.preventDefault()

    if (flashcardSets.length >= PER_PAGE) {
      router.push(
        { pathName: router.pathname, query: { page: currentPage + 1 } },
        undefined,
        { shallow: true },
      )
      setCurrentPage(currentPage + 1)
    }
  }

  const prev = (e) => {
    e.preventDefault()

    if (currentPage > 1) {
      router.push(
        { pathName: router.pathname, query: { page: currentPage } },
        undefined,
        { shallow: true },
      )
      setCurrentPage(currentPage - 1)
    }
  }

  if (isLoading) return <Layout loading />

  const links = [
    { href: '/', name: _e('nav.home') },
    { href: '/flashcards', name: _e('nav.flashcards') },
  ]

  return (
    <Layout>
      <div className="container">
        <div className="mb-4">
          <Breadcrumb links={links} />
        </div>

        <div className="mb-4">
          <Sets flashcardSets={flashcardSets} />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={prev}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-2">
            <ArrowLeftIcon />
            {_e('common.previous')}
          </Button>
          <Button
            onClick={next}
            disabled={flashcardSets.length < PER_PAGE}
            className="inline-flex items-center gap-2">
            {_e('common.next')}
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </Layout>
  )
}
