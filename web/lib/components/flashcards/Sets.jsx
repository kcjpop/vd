import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { HiDotsVertical, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'

import { useTranslation } from '../../i18n'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Dialog } from '../common/Dialog'
import { useDropdown } from '../useDropdown'
import { ToastContext } from '../../context/Toast'

function EditSetDialog({ set, onOpenChange, updateSet, ...props }) {
  const [name, setName] = useState(set.name)
  const { _e } = useTranslation()
  const { notify } = useContext(ToastContext)

  const updateName = (e) => {
    setName(e.target.value)
  }

  const doUpdateSet = async (e) => {
    e.preventDefault()

    await updateSet.mutateAsync({ id: set.id, name: name, userId: set.user_id })

    if (updateSet.status === 'success') {
      notify({ title: _e('flashcardset.updateNameSuccessfully') })
      onOpenChange(false)
    }
  }

  return (
    <Dialog
      title={_e('flashcardset.form.name')}
      onOpenChange={onOpenChange}
      {...props}>
      <div className="p-2">
        <form className="flex w-80 flex-col gap-2">
          {updateSet.error && (
            <p className="my-2 text-sm text-red-500">
              {_e('flashcardset.error.updateNameFail')}
            </p>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Input name="name" value={name} onChange={updateName} />
            <Button
              className="border border-sky-300 bg-sky-100 text-sm font-semibold text-sky-700 hover:border-sky-400"
              onClick={doUpdateSet}>
              {_e('flashcardset.form.updateName')}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

function ConfirmSetDeletionModal({ action, open, onOpenChange }) {
  const { _e } = useTranslation()

  const handleClick =
    (confirm = false) =>
    (e) => {
      e.preventDefault()

      confirm && action()
      onOpenChange(false)
    }

  return (
    <Dialog
      title={_e('flashcardset.modal.confirm')}
      open={open}
      onOpenChange={onOpenChange}
      dismissable={false}>
      <div className="p-2">
        <p className="mb-5 text-red-500">
          {_e('flashcardset.modal.doYouWantToDeleteThisSet')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="rounded border border-sky-300 bg-sky-100 text-sm font-semibold text-sky-700 hover:border-sky-400"
            onClick={handleClick(true)}>
            {_e('common.confirm')}
          </Button>
          <Button
            className="rounded border border-slate-300 bg-slate-100 text-sm font-semibold text-slate-700 hover:border-slate-400"
            onClick={handleClick()}>
            {_e('common.cancel')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

function FlashcardSetDropdown({ set, updateSet }) {
  const { _e } = useTranslation()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

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

  const openEditDialog = (e) => {
    e.preventDefault()
    setIsEditDialogOpen(true)
  }

  const doRemoveSet = () => {
    // @TODO: replace this with remove set action
    console.log('action done')
  }

  const confirmRemoveSet = (e) => {
    e.preventDefault()

    setIsConfirmModalOpen(true)
  }

  return (
    <div className="relative">
      <Button
        className="rounded-full px-0 py-1 text-slate-400 hover:text-slate-600 hover:shadow-sm"
        onClick={toggleDropdown}
        onBlur={doCloseDropdown}
        {...referenceProps()}>
        <HiDotsVertical className="h-6 w-6" />
      </Button>
      {isOpen && (
        <div
          className="z-30 w-36 rounded border border-slate-200 bg-white p-1 text-gray-800 shadow-lg"
          {...floatingProps({ right: 0 })}>
          <ul>
            <li
              className="mb-1 flex flex-row items-center justify-between rounded px-2 py-1 hover:bg-slate-100"
              onClick={openEditDialog}>
              {_e('flashcardset.dropdown.rename')}{' '}
              <HiOutlinePencil className="h-4 w-4" />
            </li>
            <li
              className="mb-1 flex flex-row items-center justify-between rounded px-2 py-1 hover:bg-slate-100"
              onClick={confirmRemoveSet}>
              {_e('flashcardset.dropdown.delete')}{' '}
              <HiOutlineTrash className="h-4 w-4 text-red-400" />
            </li>
          </ul>
        </div>
      )}
      <EditSetDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        updateSet={updateSet}
        set={set}
      />
      <ConfirmSetDeletionModal
        open={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        action={doRemoveSet}
      />
    </div>
  )
}

function Set({ set, updateSet }) {
  const { _e } = useTranslation()
  const router = useRouter()

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
        <FlashcardSetDropdown set={set} updateSet={updateSet} />
      </div>
      <div
        id="overlay"
        className="absolute top-0 left-0 z-10 h-full w-full bg-transparent"
        onClick={navigate}></div>
    </div>
  )
}

export function Sets({ flashcardSets = [], updateSet }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {flashcardSets.map((set) => (
        <Set key={set.id} set={set} updateSet={updateSet} />
      ))}
    </div>
  )
}
