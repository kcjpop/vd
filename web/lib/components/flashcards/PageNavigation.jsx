import { useRouter } from 'next/router'

import { Button } from '../common/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../common/Icons'
import { useTranslation } from '../../i18n'

export function PageNavigation({
  currentPage,
  onUpdateCurrentPage,
  isPrevDisabled,
  isNextDisabled,
}) {
  const { _e } = useTranslation()
  const router = useRouter()

  const next = (e) => {
    e.preventDefault()

    onUpdateCurrentPage(currentPage + 1)
    router.push(
      { pathName: router.pathname, query: { page: currentPage + 2 } },
      undefined,
      { shallow: true },
    )
  }

  const prev = (e) => {
    e.preventDefault()

    onUpdateCurrentPage(currentPage - 1)
    router.push(
      { pathName: router.pathname, query: { page: currentPage } },
      undefined,
      { shallow: true },
    )
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={prev}
        disabled={isPrevDisabled}
        className="inline-flex items-center gap-2">
        <ArrowLeftIcon />
        {_e('common.previous')}
      </Button>
      <Button
        onClick={next}
        disabled={isNextDisabled}
        className="inline-flex items-center gap-2">
        {_e('common.next')}
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
