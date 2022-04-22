import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import { useRouter } from 'next/router'

import { Layout } from '../common/Layout'
import { useFlashcardSet } from '../../hooks/flashcards/useFlashcardSet'
import { useUser } from '../../domain-logic/auth'

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

export function Page() {
  const router = useRouter()

  const { user } = useUser()
  const { currentSet } = useFlashcardSet({ ...router.query, user })

  return (
    <Layout>
      {!currentSet ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-2xl font-bold">Please wait...</div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{currentSet.name}</h1>
          <Swiper
            pagination={{ type: 'fraction' }}
            navigation={true}
            modules={[Pagination, Navigation]}>
            {currentSet.flashcards.map((flashcard) => (
              <SwiperSlide key={flashcard.id}>
                <div className="flex h-full w-full items-center justify-center py-12">
                  <FlipCard flashcard={flashcard} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </Layout>
  )
}