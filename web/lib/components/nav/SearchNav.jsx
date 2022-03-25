import Link from 'next/link'
import { useRouter } from 'next/router'

import { SearchIcon } from '../common/Icons'
import { SettingButton } from './SettingButton'

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
    <ul className="flex h-full items-center gap-4 px-4">
      <li>
        <Link href="/">
          <a className="p-2 font-bold">tudien.io</a>
        </Link>
      </li>
      <li className="flex-1">
        <SearchForm />
      </li>
      <li className="ml-auto">
        <SettingButton />
      </li>
    </ul>
  )
}
