import Link from 'next/link'

export function Nav() {
  // @FIXME
  return (
    <nav className="sticky top-0 bg-gray-800 text-gray-200">
      <div className="mx-auto max-w-7xl p-4">
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              <a className="block rounded-md bg-gray-900 py-2 px-4">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="block rounded-md py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                About
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
