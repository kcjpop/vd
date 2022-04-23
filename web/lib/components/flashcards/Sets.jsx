import { useState } from 'react'
import { useRouter } from 'next/router'
import { HiDotsVertical, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'

import { useTranslation } from '../../i18n'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Dialog } from '../common/Dialog'
import { Modal } from '../common/Modal'
import { useDropdown } from '../useDropdown'

function EditSetDialog({ set, ...props }) {
  const [name, setName] = useState(set.name)
  const { _e } = useTranslation()

  const updateName = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  return (
    <Dialog {...props}>
      <div className="p-2">
        <form className="flex w-80 flex-col gap-2">
          <label className="">{_e('flashcardset.form.name')}</label>
          <div className="grid grid-cols-2 gap-2">
            <Input name="name" value={name} onChange={updateName} />
            <Button
              className="border border-sky-300 bg-sky-100 text-sm font-semibold text-sky-700 hover:border-sky-400"
              // onClick={}
            >
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
    <Modal
      title={_e('flashcardset.modal.confirm')}
      open={open}
      onOpenChange={onOpenChange}>
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
    </Modal>
  )
}

function FlashcardSetDropdown({ set }) {
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

function Set({ set }) {
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
        <FlashcardSetDropdown set={set} />
      </div>
      <div
        id="overlay"
        className="absolute top-0 left-0 z-10 h-full w-full bg-transparent"
        onClick={navigate}></div>
    </div>
  )
}

export function Sets({ flashcardSets = [] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {flashcardSets.map((set) => (
        <Set key={set.id} set={set} />
      ))}
    </div>
  )
}
