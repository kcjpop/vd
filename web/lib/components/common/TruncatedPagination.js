import clsx from 'clsx'

/**
 * Based on this gist
 * https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
 */

const DOTS = '…'

function getRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
}

function pagination(current, length, delta = 4) {
  const range = {
    start: Math.round(current - delta / 2),
    end: Math.round(current + delta / 2),
  }

  if (range.start - 1 === 1 || range.end + 1 === length) {
    range.start += 1
    range.end += 1
  }

  let pages =
    current > delta
      ? getRange(
          Math.min(range.start, length - delta),
          Math.min(range.end, length),
        )
      : getRange(1, Math.min(length, delta + 1))

  const withDots = (value, pair) =>
    pages.length + 1 !== length ? pair : [value]

  if (pages[0] !== 1) {
    pages = withDots(1, [1, DOTS]).concat(pages)
  }

  if (pages[pages.length - 1] < length) {
    pages = pages.concat(withDots(length, [DOTS, length]))
  }

  return pages
}

function DefaultLinkComponent({ page, currentPage }) {
  if (page === null) return <span>…</span>

  return (
    <span
      className={clsx({
        'font-bold': currentPage === page,
      })}>
      {page}
    </span>
  )
}

export function TruncatedPagination({
  currentPage,
  totalPage,
  LinkComponent = DefaultLinkComponent,
}) {
  const pages = pagination(currentPage, totalPage)

  return (
    <div className="flex items-center justify-between gap-2">
      {pages.map((page, i) => (
        <LinkComponent
          key={page + i}
          page={page !== DOTS ? page : null}
          currentPage={currentPage}
        />
      ))}
    </div>
  )
}
