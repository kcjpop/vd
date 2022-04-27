import { useRouter } from 'next/router'

import { Button } from '../common/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../common/Icons'
import { useTranslation } from '../../i18n'

export function PageNavigation({ page, total, perPage }) {
  const { _e } = useTranslation()
  const router = useRouter()

  const next = (e) => {
    e.preventDefault()
    router.push({ pathName: router.pathname, query: { page: page + 1 } })
  }

  const prev = (e) => {
    e.preventDefault()
    router.push({ pathName: router.pathname, query: { page: page - 1 } })
  }

  if (total < perPage) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={prev}
        disabled={page === 1}
        className="inline-flex items-center gap-2">
        <ArrowLeftIcon />
        {_e('common.previous')}
      </Button>
      <Button
        onClick={next}
        disabled={page === Math.ceil(total / perPage)}
        className="inline-flex items-center gap-2">
        {_e('common.next')}
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
