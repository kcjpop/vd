import { useState } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from '../../i18n'
import { LinkToWord } from '../common/LinkToWord'

import { VerbTenses } from './VerbTenses'
import { Examples } from './Examples'
import { Idioms } from './Idioms'
import { FlashcardDialog } from '../flashcards/FlashcardDialog'

function SeeAlso({ words }) {
  const { _e } = useTranslation()

  if (!Array.isArray(words) || words.length === 0) return null

  return (
    <>
      <p className="upper-first mb-2 font-semibold">
        {_e('word.seeAlso', { count: words.length })}:
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {words.map((word) => (
          <LinkToWord
            key={word}
            query={{ word }}
            className="border-b-2 border-sky-600">
            {word}
          </LinkToWord>
        ))}
      </div>
    </>
  )
}

function Definition({ def, index, clickable, onClick }) {
  const { _e } = useTranslation()

  const id = `def-${def.id}`

  return (
    <div
      className={`flex flex-col gap-4 border border-transparent p-2 ${
        clickable &&
        'cursor-pointer rounded hover:border-orange-300 hover:bg-orange-100'
      }`}
      id={id}
      onClick={onClick}>
      <p className="font-semibold">
        {index && (
          <a
            title={_e('word.copyPermalink')}
            href={'#' + id}
            className="mr-1 text-sm text-slate-400 hover:text-slate-600">
            {index}.
          </a>
        )}

        <span className="text-pink-700">{def.meaning}</span>
      </p>

      {def.text && <p className="ml-4">{def.text}</p>}

      {def.examples && (
        <div className="ml-4">
          <Examples examples={def.examples} />
        </div>
      )}

      {def.relatedWords && (
        <div className="ml-4">
          <SeeAlso words={def.relatedWords} />
        </div>
      )}
    </div>
  )
}

export function WordDefinition({ def, tenses, flashcardMode }) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDefinition, setSelectedDefinition] = useState(null)

  const isVerb =
    def.partOfSpeech?.includes('động từ') || def.partOfSpeech === 'verb'

  const doCreateNewFlashcard = (definition) => () => {
    if (!flashcardMode) return

    setSelectedDefinition(definition)
    setIsDialogOpen(true)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <FlashcardDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          word={router.query.word}
          definition={selectedDefinition}
        />

        <h3 className="mt-2">
          <span className="rounded bg-sky-100 p-2 font-bold uppercase text-sky-600">
            {def.partOfSpeech}
          </span>
        </h3>

        {isVerb && <VerbTenses tenses={tenses} />}

        {def.definitions.map((d, index) => (
          <Definition
            def={d}
            index={index + 1}
            key={d.meaning}
            clickable={flashcardMode}
            onClick={doCreateNewFlashcard(d)}
          />
        ))}
      </div>

      <div>
        <Idioms idioms={def.idioms} />
      </div>
    </div>
  )
}
