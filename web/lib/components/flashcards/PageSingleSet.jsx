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
import { DeckIcon, ListIcon } from '../common/Icons'
import { useTranslation } from '../../i18n'
import { useUser } from '../../auth'
import { getFlashcardMode } from '../../storage'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { FlipCard } from './FlashcardDeck'
import { FlashcardRow } from './FlashcardRow'
import { useSingleSet } from './useSingleSet'

const LIST_MODE = 'list'
const DECK_MODE = 'deck'

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
        <div className="flex justify-end gap-2">
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
          <Button>{_e('flashcard.addNewCard')}</Button>
          <Button
            className="text-red-500"
            disabled={currentSet.user_id !== user.id}>
            {_e('flashcard.deleteSet')}
          </Button>
        </div>
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
            <FlashcardRow
              key={flashcard.id}
              flashcard={flashcard}
              editable={flashcard.user_id === user.id}
            />
          ))}
        </div>
      )}
    </Layout>
  )
}
