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

    router.push(
      { pathName: router.pathname, query: { page: currentPage + 1 } },
      undefined,
      { shallow: true },
    )
    onUpdateCurrentPage(currentPage + 1)
  }

  const prev = (e) => {
    e.preventDefault()

    router.push(
      { pathName: router.pathname, query: { page: currentPage - 1 } },
      undefined,
      { shallow: true },
    )
    onUpdateCurrentPage(currentPage - 1)
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
