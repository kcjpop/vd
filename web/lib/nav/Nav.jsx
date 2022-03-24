import Link from 'next/link'
import { SettingButton } from './SettingButton'

export function Nav() {
  return (
    <nav className="sticky top-0 bg-gray-800 text-gray-200">
      <div className="mx-auto max-w-7xl p-4">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">
              <a className="block rounded-md py-2 px-4 hover:bg-gray-900">
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="block rounded-md py-2 px-4 hover:bg-gray-900 hover:text-gray-100">
                About
              </a>
            </Link>
          </li>
          <li className="ml-auto">
            <SettingButton />
          </li>
        </ul>
      </div>
    </nav>
  )
}
