import { useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { Dialog } from '../common/Dialog'
import { Layout } from '../common/Layout'
import { Breadcrumb } from '../common/Breadcrumb'
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '../common/Icons'

import { useUser } from '../../auth'
import { useTranslation } from '../../i18n'
import { ToastContext } from '../../context/Toast'

import { useAllSets } from './useAllSets'
import { Sets } from './Sets'

const PER_PAGE = 9

export function CreateNewSetDialog({ onCreateNewSet, onOpenChange, ...props }) {
  const [name, setName] = useState('')
  const { _e } = useTranslation()

  const updateName = (e) => setName(e.target.value)

  return (
    <Dialog
      title={_e('flashcardset.create')}
      onOpenChange={onOpenChange}
      {...props}>
      <form action="" className="p-2">
        <div className="grid grid-cols-2 gap-2">
          <Input name="name" value={name} onChange={updateName} />
          <Button
            className="border border-sky-300 bg-sky-100 text-sm font-semibold text-sky-700 hover:border-sky-400"
            onClick={onCreateNewSet(name)}>
            {_e('common.create')}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export function PageAllSets({ page }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(Number(page) - 1)

  const { _e } = useTranslation()
  const router = useRouter()
  const { notify } = useContext(ToastContext)
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const { flashcardSets, isLoading, updateSet, deleteSet, createNewSet } =
    useAllSets({
      user,
      fetchAllSets: true,
      perPage: PER_PAGE,
      page: currentPage,
      fields: 'id, name, user_id, flashcards(id)',
    })

  const next = (e) => {
    e.preventDefault()

    flashcardSets.length >= PER_PAGE && setCurrentPage(currentPage + 1)
    router.push(
      { pathName: router.pathname, query: { page: currentPage + 2 } },
      undefined,
      { shallow: true },
    )
  }

  const prev = (e) => {
    e.preventDefault()

    currentPage > 0 && setCurrentPage(currentPage - 1)
    router.push(
      { pathName: router.pathname, query: { page: currentPage } },
      undefined,
      { shallow: true },
    )
  }

  const doCreateNewSet = (name) => async (e) => {
    e.preventDefault()

    await createNewSet.mutateAsync({ name, userId: user.id })

    if (createNewSet.status !== 'error') {
      notify({ title: _e('flashcardset.createNewSetSuccessfully') })
    } else {
      notify({
        title: _e('flashcardset.error.createNewSet'),
        variant: 'error',
      })
    }

    setIsDialogOpen(false)
  }

  if (isLoading) return <Layout loading />

  const links = [
    { href: '/', name: _e('nav.home') },
    { href: '/flashcards', name: _e('nav.flashcards') },
  ]

  const openDialog = () => setIsDialogOpen(true)

  return (
    <Layout>
      <div className="container">
        <div className="mb-2 grid w-full grid-cols-2 grid-rows-1">
          <div className="flex w-full items-center">
            <Breadcrumb links={links} />
          </div>
          <div className="flex w-full flex-row items-center justify-end">
            <Button
              className="grid-rows-2-min-fr grid auto-cols-min grid-cols-2 gap-2 rounded border border-sky-300 bg-sky-100 p-2 text-sm font-semibold text-sky-700 hover:border-sky-400"
              onClick={openDialog}>
              <PlusIcon className="h-5 w-5" />{' '}
              <span className="">{_e('flashcardset.create')}</span>
            </Button>
          </div>
        </div>
        <CreateNewSetDialog
          onCreateNewSet={doCreateNewSet}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />

        <div className="mb-4">
          <Sets
            flashcardSets={flashcardSets}
            updateSet={updateSet}
            deleteSet={deleteSet}
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={prev}
            disabled={currentPage === 0}
            className="inline-flex items-center gap-2">
            <ArrowLeftIcon />
            {_e('common.previous')}
          </Button>
          <Button
            onClick={next}
            disabled={flashcardSets.length <= PER_PAGE}
            className="inline-flex items-center gap-2">
            {_e('common.next')}
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </Layout>
  )
}
