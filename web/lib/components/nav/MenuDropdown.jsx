import Link from 'next/link'
import { useRouter } from 'next/router'

import { MenuIcon } from '../common/Icons'
import { useTranslation } from '../../i18n'
import { useUser, logout } from '../../domain-logic/auth'
import { useDropdown } from '../useDropdown'

import { UserProfile } from './UserProfile'

export function MenuDropdown() {
  const router = useRouter()
  const { _e } = useTranslation()
  const { user } = useUser({ redirectIfUnauthenticated: false })

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
          className="w-80 rounded border border-slate-200 bg-white p-4 text-gray-800 shadow-lg"
          {...floatingProps()}>
          <ul>
            {user ? (
              <>
                <li className="mb-2">
                  <UserProfile user={user} />
                </li>
                <li>
                  <a
                    onClick={doLogout}
                    href="#"
                    className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                    Đăng xuất <span>😘</span>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/register">
                    <a className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                      Đăng ký tài khoản <span>🤩</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/auth">
                    <a className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                      Đăng nhập <span>🤗</span>
                    </a>
                  </Link>
                </li>
              </>
            )}
            <li>
              <a
                href="#"
                className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                Giới thiệu <span>🤔</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex justify-between rounded p-4 font-semibold hover:bg-slate-100">
                Liên hệ <span>🥰</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
