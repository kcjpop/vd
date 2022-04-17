import { useState } from 'react'

import { ZapIcon } from '../common/Icons'

import { WordMenu } from '../word-menu/WordMenu'

import { Speech } from './Speech'
import { Pronunciations } from './Pronunciations'
import { WordDefinition } from './WordDefinition'
import { useTranslation } from '../../i18n'
import { useUser } from '../../domain-logic/auth'
import { FlashcardWarningDialog } from '../../components/word/FlashcardWarningDialog'

function BtnCreatFlashcard({ active, onClick }) {
  const { _e } = useTranslation()

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border border-orange-200 p-2 text-orange-700 hover:border-orange-300 lg:rounded lg:px-4 ${
        active ? 'bg-orange-200' : 'bg-orange-100'
      } `}>
      <span className="hidden text-sm font-semibold tracking-wide lg:inline-block">
        {_e('flashcard.create')}
      </span>
      <ZapIcon />
    </button>
  )
}

export function Word({ word: w }) {
  const [flashcardMode, setFlashcardMode] = useState(false)
  const [warningMode, setWarningMode] = useState(false)
  const { user } = useUser({ redirectIfUnauthenticated: false })

  const doToggleFlashcardMode = () => {
    !user ? setWarningMode((old) => !old) : setFlashcardMode((old) => !old)
  }

  return (
    <div
      className="relative grid gap-2"
      style={{ gridTemplateColumns: '1fr auto' }}>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="break-all text-3xl font-bold">{w.word}</h1>
          <span>
            <Speech word={w.word} />
          </span>
        </div>

        <Pronunciations entries={w.pronunciations} />
      </div>

      <div className="sticky inset-y-20">
        <div className="flex items-center gap-2">
          <BtnCreatFlashcard
            onClick={doToggleFlashcardMode}
            active={flashcardMode}
          />

          <WordMenu />
        </div>
      </div>

      <FlashcardWarningDialog
        open={warningMode}
        onOpenChange={setWarningMode}
      />

      <div className="col-span-2 flex flex-col gap-4">
        {w.definitions.map((def, i) => (
          <WordDefinition
            key={def.partOfSpeech + i}
            def={def}
            tenses={w.tenses}
            flashcardMode={flashcardMode}
            warningMode={warningMode}
          />
        ))}
      </div>
    </div>
  )
}

/*
interface Example {
  text: string
  translation: string
}

interface Definition {
  meaning: string
  examples?: Example[]
}

interface Idiom {
  text: string[]
  definitions?: Definition[]
}

interface WordDefinition {
  partOfSpeech: string
  definitions: Definition[]
  idioms: Idioms[]
  synonymps: string[]
}

interface Word {
  word: string
  ipa: string
  definitions: WordDefinition[]
}

*/
