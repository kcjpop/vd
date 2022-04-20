import Link from 'next/link'
import { useFlashcards } from '../../domain-logic/flashcards'
import { useTranslation } from '../../i18n'

function Set({ set }) {
  const { total } = useFlashcards({ set_id: set.id })
  const { _e } = useTranslation()

  return (
    <Link href={`/flashcards/${set.id}`}>
      <div className="flex aspect-video w-full flex-col items-center justify-center rounded border shadow hover:text-sky-300 hover:shadow-lg hover:shadow-sky-200">
        <p className="text-bold text-center text-xl">{set.name}</p>
        <p className="mt-1 text-center text-sm text-slate-400">
          ({total}&nbsp;{_e('flashcard.flashcards')})
        </p>
      </div>
    </Link>
  )
}

export function Sets({ flashcardSets }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {flashcardSets.map((set) => (
        <Set key={set.id} set={set} />
      ))}
    </div>
  )
}
