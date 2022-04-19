import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import { useFlashcards } from '../../domain-logic/flashcards'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import s from './style.module.css'

function FlipCard({ flashcard }) {
  const [flipped, setFlipped] = useState(false)

  function toggleFlipped() {
    setFlipped(!flipped)
  }

  return (
    <div
      className={s.flipcard}
      onClick={toggleFlipped}
      data-state={flipped && 'flipped'}>
      <div className={s.flipcard__inner}>
        <div className={s.flipcard__front}>{flashcard.word}</div>
        <div className={s.flipcard__back}>{flashcard.definition}</div>
      </div>
    </div>
  )
}

export function Content({ selected }) {
  const { flashcards } = useFlashcards({ set_id: selected })

  console.log({ flashcards })

  return (
    <Swiper
      pagination={{ type: 'fraction' }}
      navigation={true}
      modules={[Pagination, Navigation]}>
      {flashcards.map((flashcard) => (
        <SwiperSlide key={flashcard.id}>
          <div className="flex h-full w-full items-center justify-center py-12">
            <FlipCard flashcard={flashcard} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
