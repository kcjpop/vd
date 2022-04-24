import Link from 'next/link'
import { FaChevronRight as Chevron } from 'react-icons/fa'

export function Breadcrumb({ className, links }) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {links.map(({ href, name }, index) =>
          index < links.length - 1 ? (
            <li key={href} className="inline-flex items-center">
              <Link href={href}>
                <a
                  href=""
                  className="mr-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:mr-2">
                  {name}
                </a>
              </Link>
              <Chevron className="h-6 w-6 text-gray-400" />
            </li>
          ) : (
            <li key={href} aria-current="page">
              <div className="flex items-center">
                <span className="mr-1 text-sm font-medium text-gray-400 md:mr-2">
                  {name}
                </span>
              </div>
            </li>
          ),
        )}
      </ol>
    </nav>
  )
}
