import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

import { TruncatedPagination } from '../common/TruncatedPagination'
import { Layout } from '../common/Layout'
import { Select } from '../common/Select'
import { LinkToWord } from '../common/LinkToWord'

const DEFAULT_LIMIT = 100

function PageLink({ page, currentPage }) {
  const router = useRouter()
  const newOffset = (page - 1) * Number(router.query.limit ?? DEFAULT_LIMIT)

  if (page === null) return <span className="text-slate-400">…</span>

  return (
    <Link
      href={{
        pathname: router.pathname,
        query: { ...router.query, offset: newOffset },
      }}>
      <a
        className={clsx(
          'rounded bg-orange-100 px-4 py-2 text-sm tracking-wide text-orange-700',
          {
            'font-bold': currentPage === page,
          },
        )}>
        {page}
      </a>
    </Link>
  )
}

export function PageDict({ opengraph, words, total, offset, limit }) {
  const router = useRouter()

  const totalPage = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  const doChangeLimit = (e) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, limit: e.target.value },
    })
  }

  const formatter = new Intl.NumberFormat('vi-VN')

  return (
    <Layout opengraph={opengraph}>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Từ điển Anh Việt</h1>
        <div className="flex items-center justify-between">
          <span>
            Showing{' '}
            <strong className="font-bold">
              {formatter.format(offset)} -{' '}
              {formatter.format(offset + words.length)}/
              {formatter.format(total)}
            </strong>{' '}
            words
          </span>

          <div>
            Words per page{' '}
            <Select
              className="py-1 px-2"
              value={limit}
              onChange={doChangeLimit}>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </Select>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {words.map(({ word }) => (
            <LinkToWord
              mergeQuery={false}
              key={word}
              query={{ word }}
              className="rounded bg-slate-100 p-2">
              {word}
            </LinkToWord>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Change to page:</span>
          <TruncatedPagination
            currentPage={currentPage}
            totalPage={totalPage}
            LinkComponent={PageLink}
          />
        </div>
      </div>
    </Layout>
  )
}
