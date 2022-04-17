import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dialog } from '../common/Dialog'
import { useTranslation } from '@/lib/i18n'

export function FlashcardWarningDialog({ open, onOpenChange }) {
  const { _e } = useTranslation()
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="py-6 px-8">
        <p>{_e('flashcard.dialog.featureForLoggedInUserOnly')}</p>
        <div className="flex w-full items-center justify-evenly py-2">
          <Link
            href={{ pathname: '/auth', query: { redirectTo: router.asPath } }}>
            <button className="rounded-md border bg-sky-200 px-4 py-2 hover:bg-sky-300">
              {_e('auth.login')}
            </button>
          </Link>
          <Link
            href={{
              pathname: '/auth/register',
              query: { redirectTo: router.asPath },
            }}>
            <button className="rounded-md border bg-sky-200 px-4 py-2 hover:bg-sky-300">
              {_e('auth.register')}
            </button>
          </Link>
        </div>
      </div>
    </Dialog>
  )
}
