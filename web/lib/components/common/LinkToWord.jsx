import Link from 'next/link'
import { useRouter } from 'next/router'

export function LinkToWord({ query, className, children, mergeQuery = true }) {
  const router = useRouter()

  return (
    <Link
      href={{
        pathname: '/w/[word]',
        query: mergeQuery ? { ...router.query, ...query } : query,
      }}>
      <a className={className}>{children}</a>
    </Link>
  )
}
