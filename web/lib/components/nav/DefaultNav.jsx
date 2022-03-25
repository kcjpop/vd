import Link from 'next/link'

export function DefaultNav() {
  return (
    <ul className="flex h-full items-center gap-4 px-4">
      <li>
        <Link href="/">
          <a className="block rounded-md p-2 font-bold hover:bg-gray-900">
            tudien.io
          </a>
        </Link>
      </li>
    </ul>
  )
}
