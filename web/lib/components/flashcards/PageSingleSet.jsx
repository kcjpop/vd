import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Layout } from '../common/Layout'
import { Alert } from '../common/Alert'
import { Breadcrumb } from '../common/Breadcrumb'
import { Button } from '../common/Button'
import { ButtonGroup } from '../common/ButtonGroup'
import {
  DeckIcon,
  ListIcon,
  EditIcon,
  TrashIcon,
  VolumnIcon,
} from '../common/Icons'
import { useTranslation } from '../../i18n'
import { useUser } from '../../auth'
import { getFlashcardMode } from '../../storage'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { useSingleSet } from './useSingleSet'
import s from './style.module.css'

const LIST_MODE = 'list'
const DECK_MODE = 'deck'

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
  const [viewMode, setViewMode] = useState()

  const router = useRouter()
  const { _e } = useTranslation()
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const { currentSet, isLoading, isError } = useSingleSet({ setId, user })

  const switchViewMode = (mode) => (e) => {
    getFlashcardMode().set(mode)
    setViewMode(mode)
  }

  useEffect(() => {
    setViewMode(getFlashcardMode().get())
  }, [])

  const links = [
    { href: '/', name: _e('nav.home') },
    { href: '/flashcards', name: _e('nav.flashcards') },
    { href: router.asPath, name: currentSet?.name },
  ]

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
      <div className="mb-4">
        <Breadcrumb links={links} />
      </div>

      <div className="mb-4 flex items-end justify-between">
        <h1 className="text-3xl font-bold">{currentSet.name}</h1>
        <ButtonGroup>
          <Button
            variant={viewMode === DECK_MODE ? 'primary' : 'default'}
            onClick={switchViewMode(DECK_MODE)}>
            <DeckIcon size="20px" />
          </Button>
          <Button
            variant={viewMode === LIST_MODE ? 'primary' : 'default'}
            onClick={switchViewMode(LIST_MODE)}>
            <ListIcon size="20px" />
          </Button>
        </ButtonGroup>
      </div>

      {viewMode === DECK_MODE ? (
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
      ) : (
        <div className="flex flex-col gap-2">
          {currentSet.flashcards.map((flashcard) => (
            <div
              key={flashcard.id}
              className="grid grid-cols-3 grid-rows-1 rounded-lg bg-slate-100 p-2 shadow hover:bg-slate-200"
              style={{
                gridTemplateColumns: '1fr 1fr min-content',
              }}>
              <div className="flex items-center border-2 border-t-0 border-l-0 border-b-0 border-white px-4">
                {flashcard.word}
              </div>
              <div className="flex items-center border-2 border-t-0 border-l-0 border-b-0 border-white px-4">
                {flashcard.definition}
              </div>
              <div className="flex items-center gap-0.5 px-2">
                <Button>
                  <VolumnIcon size="16px" />
                </Button>
                <Button>
                  <EditIcon size="16px" />
                </Button>
                <Button>
                  <TrashIcon
                    size="16px"
                    className="text-red-500"
                    disabled={flashcard.id !== user.id}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}
