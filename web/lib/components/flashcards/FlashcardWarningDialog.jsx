import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dialog } from '../common/Dialog'
import { useTranslation } from '@/lib/i18n'

export function FlashcardWarningDialog({ open, onOpenChange }) {
  const { _e } = useTranslation()
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="p-2">
        <p className="mb-4">
          {_e('flashcard.dialog.featureForLoggedInUserOnly')}
        </p>

        <div className="flex items-center gap-2">
          <Link
            href={{ pathname: '/auth', query: { redirectTo: router.asPath } }}>
            <a className="rounded border border-orange-200 bg-orange-100 p-2 text-sm font-semibold tracking-wide text-orange-700 hover:border-orange-300">
              {_e('auth.login')}
            </a>
          </Link>
          <Link
            href={{
              pathname: '/auth/register',
              query: { redirectTo: router.asPath },
            }}>
            <a className="rounded border border-orange-200 bg-orange-100 p-2 text-sm font-semibold tracking-wide text-orange-700 hover:border-orange-300">
              {_e('auth.register')}
            </a>
          </Link>
        </div>
      </div>
    </Dialog>
  )
}
