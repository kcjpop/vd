import { useEffect, useState } from 'react'

import { recentlyViewedWords } from '@/lib/storage'

import { LinkToWord } from '../common/LinkToWord'

export function Suggestions() {
  const [words, setWords] = useState()

  useEffect(() => {
    const words = recentlyViewedWords().get()
    if (words) setWords(words)
  }, [])

  if (!words) return null

  return (
    <div className="grid grid-cols-2">
      {words.map((word) => (
        <LinkToWord key={word} word={word} />
      ))}
    </div>
  )
}
