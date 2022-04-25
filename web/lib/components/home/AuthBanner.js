import { useUser, logout } from '@/lib/auth'
import Link from 'next/link'
import { LinkButton } from '../common/Button'

function UserProfile({ user }) {
  return (
    <div className="flex flex-col gap-2 rounded border-2 border-orange-300 bg-orange-100 p-4 text-slate-700">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-700 uppercase text-slate-50">
          {user.user_metadata?.fullname
            .split(/\s+/g)
            .map((c) => c.split('')[0])
            .join('.')}
        </div>
        <p className="font-semibold">Hi {user.user_metadata.fullname}! 👋</p>
      </div>

      <p>There is nothing much you can do here for now. How about…?</p>
      <ul className="ml-2">
        <li>
          <Link href="/flashcards">
            <a className="text-sm font-semibold tracking-wide text-orange-700">
              View some flashcards
            </a>
          </Link>
        </li>
        <li>
          <button
            className="text-sm font-semibold tracking-wide text-orange-700"
            onClick={() => logout()}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export function AuthBanner() {
  const { user } = useUser()

  return (
    <div>
      {user ? (
        <UserProfile user={user} />
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Link href="/auth/register" passHref>
              <LinkButton variant="secondary">Đăng ký tài khoản 🤟</LinkButton>
            </Link>

            <Link href="/auth" passHref>
              <LinkButton variant="secondary">Đăng nhập 👋</LinkButton>
            </Link>
          </div>

          <button className="p-2 text-sm text-slate-500">
            <p>Ủa tra từ điển mà cũng cần tài khoản à? 🤔</p>
          </button>
        </>
      )}
    </div>
  )
}
