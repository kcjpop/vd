import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Layout } from '../common/Layout'
import { Alert } from '../common/Alert'
import { Breadcrumb } from '../common/Breadcrumb'
import { useTranslation } from '../../i18n'
import { useUser } from '../../auth'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { useSingleSet } from './useSingleSet'
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

export function PageSingleSet({ setId }) {
  const router = useRouter()
  const { _e } = useTranslation()
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

  const links = [
    { href: '/', name: _e('nav.home') },
    { href: '/flashcards', name: _e('nav.flashcards') },
    { href: router.asPath, name: currentSet?.name },
  ]

  return (
    <Layout>
      <div className="mb-4">
        <Breadcrumb links={links} />
      </div>

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
