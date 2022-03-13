import { useRouter } from 'next/router'

export function Search() {
  const router = useRouter()

  const doSubmit = (e) => {
    e.preventDefault()
    router.push('/en-vi/actuate')
  }

  return (
    <form onSubmit={doSubmit}>
      <input
        type="search"
        placeholder="Nhập từ cần tra"
        className="block w-full rounded border-gray-300 border"
      />
    </form>
  )
}
