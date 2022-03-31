import { useTranslation } from '@/lib/i18n'

import { VerbTenses } from './VerbTenses'
import { Speech } from './Speech'
import { LinkToWord } from '../common/LinkToWord'
import { DictMenu } from './DictMenu'

// There might be multiple pronunciation. Support one for now.
function Ipa({ ipa }) {
  return <p>/{ipa}/</p>
}

function Examples({ examples }) {
  return (
    <>
      <p className="upper-first mb-2 font-semibold">Examples:</p>
      <ul className="flex list-[circle] flex-col gap-2 pl-4" data-list-char="-">
        {examples.map((ex) => (
          <li className="upper-first" key={ex.text}>
            {ex.text}{' '}
            {ex.translation && (
              <span className="italic text-stone-700">= {ex.translation}</span>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

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

function Idiom({ idiom }) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {idiom.text.map((t) => (
          <p key={t}>{t}</p>
        ))}
        <div className="ml-4">
          <div className="flex flex-col gap-2">
            {idiom.definitions.map((d) => (
              <Definition key={d.meaning} def={d} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Idioms({ idioms }) {
  if (!Array.isArray(idioms) || idioms.length === 0) return null

  return (
    <div className="flex flex-col gap-2 rounded bg-gray-100 p-4">
      <h3 className="font-bold text-sky-600">thành ngữ</h3>
      {idioms.map((i, index) => (
        <Idiom key={index} idiom={i} />
      ))}
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

      <div className="flex flex-wrap items-center gap-1">
        {words.map((word) => (
          <LinkToWord
            key={word}
            query={{ word }}
            className="rounded bg-blue-100 px-2">
            {word}
          </LinkToWord>
        ))}
      </div>
    </>
  )
}

function WordDefinition({ def, tenses }) {
  const isVerb =
    def.partOfSpeech.includes('động từ') || def.partOfSpeech === 'verb'

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold uppercase text-sky-600">{def.partOfSpeech}</h3>

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
    <div>
      <div className="mb-4">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{w.word}</h1>
            <Speech word={w.word} />
          </div>
          <div className="ml-auto">
            <DictMenu />
          </div>
        </div>

        {w.ipa && <Ipa ipa={w.ipa} />}
      </div>

      <div className="flex flex-col gap-4">
        {w.definitions.map((def) => (
          <WordDefinition key={def.partOfSpeech} def={def} tenses={w.tenses} />
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
