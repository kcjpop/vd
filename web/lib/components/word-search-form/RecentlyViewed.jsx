import { useEffect, useState } from 'react'

import { recentlyViewedWords } from '@/lib/storage'

import { LinkToWord } from '../common/LinkToWord'

export function RecentlyViewed() {
  const [words, setWords] = useState()

  useEffect(() => {
    const words = recentlyViewedWords().get()
    if (words) setWords(words)
  }, [])

  if (!words)
    return (
      <p className="text-sm text-slate-600">
        Thử nhập <span className="italic">dictionary</span> và nhấn Enter để bắt
        đầu 🥳
      </p>
    )

  return (
    <div>
      <h3 className="mb-2 font-semibold">Những từ vừa tra:</h3>
      <div className="flex flex-wrap gap-4">
        {words.map((word) => (
          <LinkToWord
            key={word}
            query={{ word }}
            className="border-b-2 border-b-sky-700">
            {word}
          </LinkToWord>
        ))}
      </div>
    </div>
  )
}
