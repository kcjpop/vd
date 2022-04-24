import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from '../../i18n'
import { useUser, logout } from '../../auth'

import { MenuIcon } from '../common/Icons'
import { useDropdown } from '../useDropdown'

import { UserProfile } from './UserProfile'

export function MenuDropdown() {
  const router = useRouter()
  const { _e } = useTranslation()
  const { user } = useUser()

  const {
    isOpen,
    referenceProps,
    doToggleDropdown,
    doCloseDropdown,
    floatingProps,
  } = useDropdown({ placement: 'bottom-end' })

  const doLogout = async (e) => {
    e.preventDefault()

    await logout()
    router.push('/')
  }

  return (
    <div className="relative">
      <button
        {...referenceProps()}
        onClick={doToggleDropdown}
        onBlur={doCloseDropdown}
        type="button"
        className="rounded-full bg-slate-200 p-2"
        title={_e('nav.settings')}>
        <MenuIcon />
      </button>

      {isOpen && (
        <div
          className="w-72 rounded border border-slate-200 bg-white p-4 text-gray-800 shadow-lg"
          {...floatingProps()}>
          <ul className="divide-y divide-dashed">
            {user ? (
              <li>
                <ul>
                  <li>
                    <UserProfile user={user} />
                  </li>
                  <li>
                    <Link href="/flashcards">
                      <a className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                        {_e('nav.flashcards')} <span>🃏</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={doLogout}
                      href="#"
                      className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                      {_e('nav.auth.logout')} <span>😌</span>
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <ul>
                  <li>
                    <Link href="/auth/register">
                      <a className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                        {_e('nav.auth.signUp')} <span>🥰</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth">
                      <a className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                        {_e('nav.auth.login')} <span>🤗</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li>
              <ul>
                <li>
                  <a
                    href="#"
                    className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                    {_e('nav.about')} <span>🤔</span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                    {_e('nav.contact')} <span>🤩</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
