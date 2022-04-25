import { useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { Dialog } from '../common/Dialog'
import { Layout } from '../common/Layout'
import { Breadcrumb } from '../common/Breadcrumb'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  DotsVerticalIcon,
  TrashIcon,
  EditIcon,
} from '../common/Icons'

import { useUser } from '../../auth'
import { useTranslation } from '../../i18n'
import { ToastContext } from '../../context/Toast'
import { useDropdown } from '../useDropdown'

import { useAllSets } from './useAllSets'

const PER_PAGE = 9

function CreateNewSetDialog({ onCreateNewSet, onOpenChange, ...props }) {
  const [name, setName] = useState('')
  const { _e } = useTranslation()

  const updateName = (e) => setName(e.target.value)

  return (
    <Dialog
      title={_e('flashcardset.create')}
      onOpenChange={onOpenChange}
      {...props}>
      <form onSubmit={onCreateNewSet(name)} className="p-2">
        <div className="grid grid-cols-2 gap-2">
          <Input
            name="name"
            value={name}
            placeholder="e.g Subject"
            onChange={updateName}
          />
          <Button
            variant="primary"
            className="border  bg-sky-100 text-sm font-semibold text-sky-700"
            type="submit">
            {_e('common.create')}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

function EditSetDialog({ set, onOpenChange, onUpdateSet, ...props }) {
  if (!set) return null

  const [name, setName] = useState(set.name)
  const { _e } = useTranslation()

  const updateName = (e) => {
    setName(e.target.value)
  }

  return (
    <Dialog
      title={_e('flashcardset.form.name')}
      onOpenChange={onOpenChange}
      {...props}>
      <div className="p-2">
        <form className="flex w-80 flex-col gap-2" onSubmit={onUpdateSet(name)}>
          <div className="grid grid-cols-2 gap-2">
            <Input name="name" value={name} onChange={updateName} />
            <Button
              className="border  bg-sky-100 text-sm font-semibold text-sky-700 "
              variant="primary"
              type="submit">
              {_e('flashcardset.form.updateName')}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

function ConfirmSetDeletionModal({ doAction, open, onOpenChange }) {
  const { _e } = useTranslation()

  const handleClick =
    (confirm = false) =>
    async (e) => {
      e.preventDefault()

      confirm && (await doAction())
      onOpenChange(false)
    }

  return (
    <Dialog
      title={_e('flashcardset.modal.confirm')}
      open={open}
      onOpenChange={onOpenChange}
      dismissable={false}>
      <form className="p-2" onSubmit={handleClick(true)}>
        <p className="mb-5 text-red-500">
          {_e('flashcardset.modal.doYouWantToDeleteThisSet')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="rounded border  bg-sky-100 py-2 text-sm font-semibold text-sky-700 "
            variant="primary"
            type="submit">
            {_e('common.confirm')}
          </Button>
          <Button
            className="rounded border border-slate-300 bg-slate-100 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            onClick={handleClick()}>
            {_e('common.cancel')}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

function FlashcardSet({ set, openDeleteConfimDialog, openEditDialog }) {
  const { _e } = useTranslation()
  const router = useRouter()

  const {
    isOpen,
    referenceProps,
    doToggleDropdown,
    doCloseDropdown,
    floatingProps,
  } = useDropdown({ placement: 'bottom-end' })

  const toggleDropdown = (e) => {
    e.preventDefault()
    doToggleDropdown()
  }

  const navigate = () => router.push(`/flashcards/${set.id}`)

  return (
    <div className="relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded border shadow hover:shadow-lg hover:shadow-sky-200">
      <p className="text-bold pointer-events-none text-center text-xl">
        {set.name}
      </p>
      <p className="pointer-events-none mt-1 text-center text-sm text-slate-400">
        ({set.flashcards.length}&nbsp;{_e('flashcard.flashcards')})
      </p>
      <div id="options" className="absolute top-1 right-1 z-20 aspect-square">
        <div className="relative">
          <Button
            className="rounded-full px-1 py-1 text-slate-400 hover:text-slate-600 hover:shadow-sm"
            onClick={toggleDropdown}
            onBlur={doCloseDropdown}
            {...referenceProps()}>
            <DotsVerticalIcon className="h-6 w-6" />
          </Button>
          {isOpen && (
            <div
              className="z-30 w-36 rounded border border-slate-200 bg-white p-1 text-gray-800 shadow-lg"
              {...floatingProps({ right: 0 })}>
              <ul>
                <li
                  className="mb-1 flex flex-row items-center justify-between rounded px-2 py-1 hover:bg-slate-100"
                  onClick={openEditDialog(set)}>
                  {_e('flashcardset.dropdown.rename')}{' '}
                  <EditIcon className="h-4 w-4" />
                </li>
                <li
                  className="mb-1 flex flex-row items-center justify-between rounded px-2 py-1 hover:bg-slate-100"
                  onClick={openDeleteConfimDialog(set)}>
                  {_e('flashcardset.dropdown.delete')}{' '}
                  <TrashIcon className="h-4 w-4 text-red-400" />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div
        id="overlay"
        className="absolute top-0 left-0 z-10 h-full w-full bg-transparent"
        onClick={navigate}></div>
    </div>
  )
}

export function PageAllSets({ page }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [editedSet, setEditedSet] = useState(null)

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

  const doUpdateSet = (name) => async (e) => {
    e.preventDefault()

    await updateSet.mutateAsync({
      id: editedSet.id,
      name: name,
      userId: editedSet.user_id,
    })
    /* Cannot use `updateSet.status === 'success'` somehow.
     * First time always return status as 'idle' which cause the
     * dialog remain open.
     */
    // @todo: using alert
    if (updateSet.status !== 'error') {
      notify({ title: _e('flashcardset.updateNameSuccessfully') })
      setIsEditDialogOpen(false)
    }

    setEditedSet(null)
  }

  const doDeleteSet = async () => {
    await deleteSet.mutateAsync({ id: editedSet.id })

    if (deleteSet.isError) {
      // @todo: using Alert instead
      notify({ title: _e('flashcardset.error.deleleSet'), variant: 'error' })
    } else {
      notify({
        title: _e('flashcardset.deleteSetSuccessfully'),
      })
    }

    setEditedSet(null)
  }

  if (isLoading) return <Layout loading />

  const links = [
    { href: '/', name: _e('nav.home') },
    { href: '/flashcards', name: _e('nav.flashcards') },
  ]

  const openDialog = () => setIsDialogOpen(true)
  const openDeleteConfimDialog = (set) => (e) => {
    setEditedSet(set)
    setIsConfirmModalOpen(true)
  }
  const openEditDialog = (set) => (e) => {
    setEditedSet(set)
    setIsEditDialogOpen(true)
  }

  return (
    <Layout>
      <div className="mb-2 grid w-full grid-cols-2 grid-rows-1">
        <div className="flex w-full items-center">
          <Breadcrumb links={links} />
        </div>
        <div className="flex w-full flex-row items-center justify-end">
          <Button
            className="grid-rows-2-min-fr grid auto-cols-min grid-cols-2 gap-2 rounded border  bg-sky-100 p-2 text-sm font-semibold text-sky-700 "
            onClick={openDialog}>
            <PlusIcon className="h-5 w-5" />{' '}
            <span className="">{_e('flashcardset.create')}</span>
          </Button>
        </div>
      </div>

      {/* Create new flashcard set */}
      <CreateNewSetDialog
        onCreateNewSet={doCreateNewSet}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      {/* Edit flashcard set */}
      <EditSetDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdateSet={doUpdateSet}
        set={editedSet}
      />

      {/* Delete flashcard set */}
      <ConfirmSetDeletionModal
        open={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        doAction={doDeleteSet}
      />

      <div className="mb-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {flashcardSets.map((set) => (
            <FlashcardSet
              key={set.id}
              set={set}
              openDeleteConfimDialog={openDeleteConfimDialog}
              openEditDialog={openEditDialog}
            />
          ))}
        </div>
      </div>

      {/* Navigators */}
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
          disabled={flashcardSets.length < PER_PAGE}
          className="inline-flex items-center gap-2">
          {_e('common.next')}
          <ArrowRightIcon />
        </Button>
      </div>
    </Layout>
  )
}
