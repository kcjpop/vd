import { SearchNav } from './SearchNav'

export function Nav({ variant = 'search' }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto h-16 max-w-7xl">
        {variant === 'search' && <SearchNav />}
      </div>
    </nav>
  )
}
