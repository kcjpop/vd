import { useState } from 'react'
import { useRouter } from 'next/router'

import { SearchIcon } from '../common/Icons'

export function Search() {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const doSubmit = (e) => {
    e.preventDefault()
    const k = keyword.trim().toLocaleLowerCase()
    if (k !== '') router.push(`/w/${k}`)
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
        className="w-full rounded-md border border-slate-300 bg-white py-4 pl-4 pr-10 placeholder-slate-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="absolute inset-y-0 right-0 p-4">
        <SearchIcon />
      </button>
    </form>
  )
}
