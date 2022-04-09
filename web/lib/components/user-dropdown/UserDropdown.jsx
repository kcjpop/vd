import { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { UserIcon } from '../common/Icons'
import { useUser, logout } from '../../domain-logic/auth'
import { useTranslation } from '../../i18n'
import { useDropdown } from '@/lib/components/useDropdown'

export function UserDropdown() {
  const { user } = useUser({ redirectIfUnauthenticated: false })
  const { _e } = useTranslation()
  const router = useRouter()

  const {
    isOpen,
    referenceProps,
    floatingProps,
    doOpenDropdown,
    doCloseDropdown,
  } = useDropdown({ placement: 'bottom-end' })

  const doLogout = async () => {
    await logout()

    router.push('/')
  }

  return (
    <>
      <button
        className="rounded bg-gray-900 p-2"
        onClick={doOpenDropdown}
        onBlur={doCloseDropdown}
        {...referenceProps()}>
        <UserIcon />
      </button>

      {isOpen && (
        <div
          className="w-36 bg-white text-gray-800 drop-shadow"
          {...floatingProps()}>
          {user ? (
            <div className="flex flex-col gap-2">
              <p className="p-2">
                {_e('user.signInAs')}
                <span className="font-bold">{user.user_metadata.fullname}</span>
              </p>
              <button onClick={doLogout} className="p-2 hover:bg-slate-100">
                {_e('auth.logout')}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/auth">
                <a className="p-2 hover:bg-slate-100">{_e('auth.login')}</a>
              </Link>
              <Link href="/auth/register">
                <a className="p-2 hover:bg-slate-100">{_e('auth.register')}</a>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  )
}
