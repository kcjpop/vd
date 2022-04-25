import { Fragment } from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from './Icons'

export function Breadcrumb({ links }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {links.map(({ href, name }, index) =>
          index < links.length - 1 ? (
            <Fragment key={href}>
              <li>
                <Link href={href}>
                  <a className="hover:text-gray-900">{name}</a>
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="text-gray-400" />
              </li>
            </Fragment>
          ) : (
            <li key={href} aria-current="page" className="text-gray-400">
              {name}
            </li>
          ),
        )}
      </ol>
    </nav>
  )
}
