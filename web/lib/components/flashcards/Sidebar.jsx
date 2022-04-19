import { useTranslation } from '../../i18n'

export function Sidebar({ flashcardSets, setSelected, selected }) {
  const { _e } = useTranslation()

  console.log({ selected })
  return (
    <>
      <h1 className="text-lg font-bold">{_e('flashcard.sets')}</h1>
      <ul className="mt-4 list-none pl-2">
        {flashcardSets.map(({ id, name }) => (
          <li
            key={id}
            className={`my-1 cursor-pointer text-base text-slate-500 hover:text-sky-400 ${
              selected === `${id}` ? '!text-sky-500' : ''
            }`}
            onClick={setSelected}
            data-id={id}>
            {name}
          </li>
        ))}
      </ul>
    </>
  )
}
