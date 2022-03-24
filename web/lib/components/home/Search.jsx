import { useState } from 'react'
import { useRouter } from 'next/router'

export function Search() {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const doSubmit = (e) => {
    e.preventDefault()
    router.push(`/w/${keyword.trim()}`)
  }

  return (
    <form onSubmit={doSubmit}>
      <input
        type="search"
        placeholder="Nhập từ cần tra"
        className="block w-full rounded-md border border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  )
}
