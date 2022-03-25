import { useRouter } from 'next/router'

import { SearchIcon } from '../common/Icons'

export function Search() {
  const router = useRouter()

  const doSubmit = (e) => {
    e.preventDefault()

    const word = e.target.elements.keyword.value.trim().toLocaleLowerCase()
    if (word !== '')
      router.push({
        pathname: '/w/[word]',
        query: { ...router.query, word },
      })
  }

  return (
    <form onSubmit={doSubmit} className="relative">
      <input
        name="keyword"
        id="keyword"
        autoComplete="en"
        type="search"
        required
        placeholder="Nhập từ cần tra"
        className="w-full rounded-md border border-slate-300 bg-white py-4 pl-4 pr-10 placeholder-slate-400 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <button type="submit" className="absolute inset-y-0 right-0 p-4">
        <SearchIcon />
      </button>
    </form>
  )
}
