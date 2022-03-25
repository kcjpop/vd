import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LinkToWord({ query, className, children }) {
  const router = useRouter()

  return (
    <Link
      href={{
        pathname: '/w/[word]',
        query: { ...router.query, ...query },
      }}>
      <a className={className}>{children}</a>
    </Link>
  )
}
