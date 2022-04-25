import Link from 'next/link'
import { useTranslation } from '../../i18n'

function Set({ set }) {
  const { _e } = useTranslation()

  return (
    <Link href={`/flashcards/${set.id}`} passHref>
      <div className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded border shadow hover:text-sky-300 hover:shadow-lg hover:shadow-sky-200">
        <p className="text-bold pointer-events-none text-center text-xl">
          {set.name}
        </p>
        <p className="pointer-events-none mt-1 text-center text-sm text-slate-400">
          {set.flashcards.length} {_e('flashcard.flashcards')}
        </p>
      </div>
    </Link>
  )
}

export function Sets({ flashcardSets = [] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {flashcardSets.map((set) => (
        <Set key={set.id} set={set} />
      ))}
    </div>
  )
}
