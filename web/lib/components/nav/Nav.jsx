import { DefaultNav } from './DefaultNav'
import { SearchNav } from './SearchNav'

export function Nav({ variant = 'default' }) {
  return (
    <nav className="sticky top-0 bg-gray-800 text-gray-200">
      <div className="mx-auto h-16 max-w-7xl">
        {variant === 'default' && <DefaultNav />}
        {variant === 'search' && <SearchNav />}
      </div>
    </nav>
  )
}
