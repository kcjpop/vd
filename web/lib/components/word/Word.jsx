import { useState, useEffect } from 'react'

import { useTranslation } from '../../i18n'
import { useUser } from '../../auth'

import { ZapIcon } from '../common/Icons'
import { WordMenu } from '../word-menu/WordMenu'
import { getHideFlashcardTip } from '../../storage'

import { FlashcardWarningDialog } from '../flashcards/FlashcardWarningDialog'

import { Speech } from './Speech'
import { Pronunciations } from './Pronunciations'
import { WordDefinition } from './WordDefinition'
import { InstructionModal } from './FlashcardInstruction'

function BtnCreateFlashcard({ active, onClick }) {
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
  const [isInstructionOpen, setIsInstructionOpen] = useState(false)
  const { user } = useUser()

  const doToggleFlashcardMode = () => {
    if (!user) {
      setWarningMode((old) => !old)
    } else {
      setFlashcardMode((old) => !old)
    }
  }

  useEffect(() => {
    if (flashcardMode && !getHideFlashcardTip().get()) {
      setIsInstructionOpen(true)
    }
  }, [setIsInstructionOpen, flashcardMode])

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
          <BtnCreateFlashcard
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

      <InstructionModal
        open={isInstructionOpen}
        onOpenChange={setIsInstructionOpen}
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
