import { useContext } from 'react'

import { SettingsContext } from '@/lib/context/Settings'
import { upperFirst } from '@/lib/utils/strings'

import { Speech } from './Speech'
import { TextToWords } from './TextToWords'

export function Examples({ examples }) {
  const {
    settings: { showSpeechForExamples },
  } = useContext(SettingsContext)

  return (
    <ul
      className={`flex flex-col gap-2 pl-4 ${
        !showSpeechForExamples && 'list-[circle]'
      }`}
      data-list-char="-">
      {examples.map((ex) => (
        <li key={ex.text}>
          <div className="flex flex-wrap gap-2">
            {showSpeechForExamples && (
              <span className="flex items-center text-sky-600">
                <Speech word={ex.text} size={18} />
              </span>
            )}

            <div>
              <TextToWords
                text={upperFirst(ex.text)}
                className="hover:underline"
              />{' '}
              {ex.translation && (
                <span className="italic text-stone-700">
                  = {upperFirst(ex.translation)}
                </span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
