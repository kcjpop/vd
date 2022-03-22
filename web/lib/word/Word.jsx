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
}

interface Word {
  word: string
  ipa: string
  definitions: WordDefinition[]
}
*/

import { parse } from '../parser'
import { words } from '../db'

function Ipa({ ipa }) {
  return <p>/{ipa}/</p>
}

function Example({ text, translation }) {
  return (
    <div className="ml-4">
      <p>
        {text} = <span className="italic text-stone-700">{translation}</span>
      </p>
    </div>
  )
}

function Definition({ def }) {
  return (
    <div className="ml-4">
      <div className="flex flex-col gap-4">
        <p className="text-rose-600">{def.meaning}</p>

        {def?.examples?.map((ex) => (
          <Example key={ex.text} text={ex.text} translation={ex.translation} />
        ))}
      </div>
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

function WordDefinition({ def }) {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-bold text-sky-600">{def.partOfSpeech}</h3>

          {def.definitions.map((d) => (
            <Definition key={d.meaning} def={d} />
          ))}
        </div>

        <Idioms idioms={def.idioms} />
      </div>
    </div>
  )
}

export function Word({ word }) {
  if (!words[word]) return <h1>Not Found</h1>

  const w = parse(words[word])

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-bold">{w.word}</h1>
        <Ipa ipa={w.ipa} />
      </div>

      <div className="flex flex-col gap-4">
        {w.definitions.map((def) => (
          <WordDefinition key={def.partOfSpeech} def={def} />
        ))}
      </div>
    </div>
  )
}
