import Link from 'next/link'
import { useRouter } from 'next/router'

import { FillBookmarkStartIcon, SearchIcon } from '../common/Icons'
import { SettingDropdown } from './SettingDropdown'
import { UserDropdown } from '../user-dropdown/UserDropdown'

function SearchForm() {
  const router = useRouter()

  const doSearch = (e) => {
    e.preventDefault()
    const k = e.target.elements.keyword.value.trim().toLocaleLowerCase()

    if (k !== '')
      router.push({
        pathname: '/w/[word]',
        query: { ...router.query, word: k },
      })
  }

  return (
    <form className="relative text-slate-900" onSubmit={doSearch}>
      <input
        name="keyword"
        id="keyword"
        autoComplete="en"
        type="search"
        required
        placeholder="Nhập từ cần tra"
        className="h-8 w-full rounded-full bg-slate-200 pl-4 placeholder:text-slate-500 focus:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <button type="submit" className="absolute inset-y-0 right-0 px-2">
        <SearchIcon />
      </button>
    </form>
  )
}

export function SearchNav() {
  return (
    <ul className="space-between flex h-full items-center gap-2 px-4">
      <li>
        <Link href="/">
          <a className="block flex items-center gap-2 font-bold">
            <FillBookmarkStartIcon size={32} className="text-rose-700" />
            tudien.io
          </a>
        </Link>
      </li>
      <li className="flex-1 md:ml-auto md:flex-none">
        <SearchForm />
      </li>
      <li>
        <UserDropdown />
      </li>
      <li>
        <SettingDropdown />
      </li>
    </ul>
  )
}
