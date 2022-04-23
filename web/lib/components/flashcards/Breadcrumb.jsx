import Link from 'next/link'

import { useTranslation } from '../../i18n'

const Chevron = function () {
  return (
    <svg
      className="h-6 w-6 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"></path>
    </svg>
  )
}

export function Breadcrumb({ set, className }) {
  const { _e } = useTranslation()

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/">
            <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
              {_e('nav.home')}
            </a>
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <Chevron />
            <Link href="/flashcards">
              <a
                href="#"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
                {_e('nav.flashcards')}
              </a>
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <Chevron />
            <span className="ml-1 text-sm font-medium text-gray-400 dark:text-gray-500 md:ml-2">
              {set.name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
