import { Fragment, useContext } from 'react'

import { useTranslation } from '../../i18n'
import { SettingsContext } from '../../context/Settings'

import { Speech } from './Speech'
import { LinkToWord } from '../common/LinkToWord'

export function Examples({ examples }) {
  const {
    settings: { showSpeechForExamples },
  } = useContext(SettingsContext)
  const { _e } = useTranslation()

  const words = (text) =>
    text.split(/\s+/).map((word) => (
      <Fragment key={word}>
        <LinkToWord query={{ word }} className="hover:underline">
          {word}
        </LinkToWord>{' '}
      </Fragment>
    ))

  return (
    <>
      <p className="upper-first mb-2 font-semibold text-slate-700">
        {_e('word.examples')}:
      </p>
      <ul className="flex list-[circle] flex-col gap-2 pl-4" data-list-char="-">
        {examples.map((ex) => (
          <li className="upper-first" key={ex.text}>
            {words(ex.text)}{' '}
            {ex.translation && (
              <span className="italic text-stone-700">= {ex.translation}</span>
            )}
            {showSpeechForExamples && (
              <span className="float-right">
                <Speech word={ex.text} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
