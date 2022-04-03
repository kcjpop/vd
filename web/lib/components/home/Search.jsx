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
    <form onSubmit={doSubmit}>
      <div className="relative mb-2">
        <input
          name="keyword"
          id="keyword"
          autoComplete="en"
          type="search"
          required
          placeholder="Bạn muốn tra gì nè? Ví dụ: dictionary"
          className="w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-10 placeholder-slate-400 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button type="submit" className="absolute inset-y-0 right-0 p-2">
          <SearchIcon />
        </button>
      </div>
      <p className="text-sm text-slate-600">
        <span className="italic">Nhấn Enter để bắt đầu</span> 🥳
      </p>
    </form>
  )
}
