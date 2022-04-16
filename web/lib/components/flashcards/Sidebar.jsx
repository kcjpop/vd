import Link from 'next/link'

export const Sidebar = function ({ sets }) {
  return (
    <ul>
      {sets.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/flashcards/${id}`}>
            <a>{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
