import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Layout } from '../common/Layout'
import { Alert } from '../common/Alert'
import { useUser } from '../../auth'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { useSingleSet } from './useSingleSet'
import { Breadcrumb } from './Breadcrumb'
import s from './style.module.css'
import { useTranslation } from '@/lib/i18n'

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

export function PageSingleSet() {
  const { _e } = useTranslation()
  const router = useRouter()
  const { setId } = router.query
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const { currentSet, isLoading, isError } = useSingleSet({ setId, user })

  if (isLoading) {
    return <Layout loading />
  }

  if (!currentSet && !isLoading) {
    return (
      <Layout>
        <Alert variant="danger">
          {_e('flashcard.errors.notFound')}{' '}
          <Link href="/flashcards">
            <a className="font-semibold">{_e('common.goBack')}</a>
          </Link>
        </Alert>
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <Alert variant="danger">{_e('error.general')}</Alert>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="mb-4 text-2xl font-bold">{currentSet.name}</h1>
      <Breadcrumb set={currentSet} />
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
    </Layout>
  )
}
