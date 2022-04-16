import { useTranslation } from '@/lib/i18n'

import { LinkToWord } from '../common/LinkToWord'

import { WordMenu } from '../word-menu/WordMenu'

import { VerbTenses } from './VerbTenses'
import { Speech } from './Speech'
import { Pronunciations } from './Pronunciations'
import { Examples } from './Examples'
import { Idioms } from './Idioms'
import { FlashcardDialog } from './FlashcardDialog'

function Definition({ def, index }) {
  const { _e } = useTranslation()

  const id = `def-${def.id}`

  return (
    <div className="flex flex-col gap-4" id={id}>
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

function WordDefinition({ def, tenses }) {
  const isVerb =
    def.partOfSpeech?.includes('động từ') || def.partOfSpeech === 'verb'

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h3 className="mt-2">
          <span className="rounded bg-sky-100 p-2 font-bold uppercase text-sky-600">
            {def.partOfSpeech}
          </span>
        </h3>

        {isVerb && <VerbTenses tenses={tenses} />}

        {def.definitions.map((d, index) => (
          <Definition def={d} index={index + 1} key={d.meaning} />
        ))}
      </div>

      <div>
        <Idioms idioms={def.idioms} />
      </div>
    </div>
  )
}

export function Word({ word: w }) {
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
          <WordMenu />
          <FlashcardDialog />
        </div>
      </div>

      <div className="col-span-2 flex flex-col gap-4">
        {w.definitions.map((def, i) => (
          <WordDefinition
            key={def.partOfSpeech + i}
            def={def}
            tenses={w.tenses}
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
