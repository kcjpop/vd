import { useState } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from '../../i18n'
import { useDropdown } from '../useDropdown'

import { DotsVerticalIcon, TrashIcon, EditIcon } from '../common/Icons'
import { Dialog } from '../common/Dialog'
import { Input } from '../common/Input'
import { Button } from '../common/Button'

function EditSetDialog({ set, onOpenChange, onSetUpdate, loading, ...props }) {
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
        <form className="flex w-80 flex-col gap-2" onSubmit={onSetUpdate(name)}>
          <div className="grid grid-cols-2 gap-2">
            <Input name="name" value={name} onChange={updateName} />
            <Button loading={loading} variant="primary" type="submit">
              {_e('flashcardset.form.updateName')}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

function ConfirmSetDeletionModal({ onSetDelete, open, onOpenChange, loading }) {
  const { _e } = useTranslation()

  const onSubmit = (e) => {
    e.preventDefault()

    onSetDelete()
    onOpenChange(false)
  }

  const onCancel = (e) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog
      title={_e('flashcardset.modal.confirm')}
      open={open}
      onOpenChange={onOpenChange}
      dismissable={false}>
      <form className="p-2" onSubmit={onSubmit}>
        <p className="mb-5 text-red-500">
          {_e('flashcardset.modal.doYouWantToDeleteThisSet')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button loading={loading} variant="primary" type="submit">
            {_e('common.confirm')}
          </Button>
          <Button disabled={loading} onClick={onCancel}>
            {_e('common.cancel')}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

function FlashcardSetDropdown({ openEditDialog, openDeleteConfimDialog }) {
  const {
    isOpen,
    referenceProps,
    doToggleDropdown,
    doCloseDropdown,
    floatingProps,
  } = useDropdown({ placement: 'bottom-end' })
  const { _e } = useTranslation()

  const toggleDropdown = (e) => {
    e.preventDefault()
    doToggleDropdown()
  }

  return (
    <div className="relative">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
        type="button"
        onClick={toggleDropdown}
        onBlur={doCloseDropdown}
        {...referenceProps()}>
        <DotsVerticalIcon size="18px" />
      </button>
      {isOpen && (
        <div
          className="z-30 w-36 rounded border border-slate-200 bg-white p-1 text-gray-800 shadow-lg"
          {...floatingProps({ right: 0 })}>
          <ul>
            <li
              className="mb-1 flex flex-row items-center justify-between rounded px-2 py-1 hover:bg-slate-100"
              onClick={openEditDialog}>
              {_e('flashcardset.dropdown.rename')} <EditIcon size="16px" />
            </li>
            <li
              className="mb-1 flex flex-row items-center justify-between rounded px-2 py-1 hover:bg-slate-100"
              onClick={openDeleteConfimDialog}>
              {_e('flashcardset.dropdown.delete')}{' '}
              <TrashIcon size="16px" className="text-red-400" />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export function FlashcardSet({
  set,
  doUpdateSet,
  doDeleteSet,
  isUpdateLoading,
  isDeleteLoading,
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { _e } = useTranslation()
  const router = useRouter()

  const navigate = () => router.push(`/flashcards/${set.id}`)

  const openDeleteConfimDialog = (e) => {
    e.preventDefault()
    setIsConfirmModalOpen(true)
  }

  const openEditDialog = (e) => {
    e.preventDefault()
    setIsEditDialogOpen(true)
  }

  const onSetUpdate = (name) => () => {
    setIsEditDialogOpen(false)
    doUpdateSet(name)
  }

  const onSetDelete = () => {
    setIsConfirmModalOpen(false)
    doDeleteSet()
  }

  return (
    <>
      <div className="relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded border shadow hover:shadow-lg">
        <p className="text-bold pointer-events-none text-center text-xl">
          {set.name}
        </p>
        <p className="pointer-events-none mt-1 text-center text-sm text-slate-400">
          ({set.flashcards.length} {_e('flashcard.flashcards')})
        </p>
        <div id="options" className="absolute top-1 right-1 z-20 aspect-square">
          <FlashcardSetDropdown
            openDeleteConfimDialog={openDeleteConfimDialog}
            openEditDialog={openEditDialog}
          />
        </div>
        <div
          id="overlay"
          className="absolute top-0 left-0 z-10 h-full w-full bg-transparent"
          onClick={navigate}></div>
      </div>

      <EditSetDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSetUpdate={onSetUpdate}
        set={set}
        loading={isUpdateLoading}
      />

      <ConfirmSetDeletionModal
        open={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onSetDelete={onSetDelete}
        loading={isDeleteLoading}
      />
    </>
  )
}
