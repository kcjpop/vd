import Link from 'next/link'

export function Nav() {
  // @FIXME
  return (
    <nav className="bg-gray-800 text-gray-400">
      <ul className="flex">
        <li>
          <Link href="/">
            <a className="block p-2">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="block p-2">About</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
