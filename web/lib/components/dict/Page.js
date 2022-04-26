import { Layout } from '../common/Layout'
import { Select } from '../common/Select'
import { LinkToWord } from '../common/LinkToWord'
import { useRouter } from 'next/router'

export function PageDict({ words, total, offset, limit }) {
  const router = useRouter()

  const doChangeLimit = (e) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, limit: e.target.value },
    })
  }

  return (
    <Layout>
      <h1 className="mb-4 text-4xl font-bold">Từ điển Anh Việt</h1>
      <div className="mb-4 flex items-center justify-between">
        <span>
          Showing{' '}
          <strong className="font-bold">
            {offset} - {offset + words.length}/{total}
          </strong>{' '}
          words
        </span>

        <div>
          Words per page{' '}
          <Select className="py-1 px-2" value={limit} onChange={doChangeLimit}>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {words.map(({ word }) => (
          <LinkToWord
            key={word}
            query={{ word }}
            className="rounded bg-slate-100 p-2">
            {word}
          </LinkToWord>
        ))}
      </div>
    </Layout>
  )
}
