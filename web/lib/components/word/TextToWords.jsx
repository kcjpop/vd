import { Fragment } from 'react'
import { LinkToWord } from '../common/LinkToWord'

export function TextToWords({ text, className }) {
  return text.split(/\s+/).map((word, i) => (
    <Fragment key={word + i}>
      <LinkToWord query={{ word }} className={className}>
        {word}
      </LinkToWord>{' '}
    </Fragment>
  ))
}
