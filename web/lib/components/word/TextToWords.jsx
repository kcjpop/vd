import { Fragment } from 'react'
import { LinkToWord } from '../common/LinkToWord'

export function TextToWords({ text, className }) {
  return text.split(/\s+/).map((word) => (
    <Fragment key={word}>
      <LinkToWord query={{ word }} className={className}>
        {word}
      </LinkToWord>{' '}
    </Fragment>
  ))
}
