import { useState, useContext } from 'react'

import { Alert } from '../common/Alert'
import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { Dialog } from '../common/Dialog'
import { Layout } from '../common/Layout'
import { Breadcrumb } from '../common/Breadcrumb'
import { PlusIcon } from '../common/Icons'

import { useUser } from '../../auth'
import { useTranslation } from '../../i18n'
import { ToastContext } from '../../context/Toast'

import { FlashcardSet } from './FlashcardSet'
import { PageNavigation } from './PageNavigation'
import { useAllSets } from './useAllSets'

const PER_PAGE = 9

function CreateNewSetDialog({
  onCreateNewSet,
  onOpenChange,
  loading,
  ...props
}) {
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
          <Button loading={loading} variant="primary" type="submit">
            {_e('common.create')}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export function PageAllSets({ page }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { _e } = useTranslation()
  const { notify } = useContext(ToastContext)
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const {
    flashcardSets,
    total,
    isLoading,
    updateSet,
    deleteSet,
    createNewSet,
  } = useAllSets({
    user,
    fetchAllSets: true,
    perPage: PER_PAGE,
    page,
    fields: 'id, name, user_id, flashcards(id)',
  })

  const doCreateNewSet = (name) => (e) => {
    e.preventDefault()

    createNewSet.mutate(
      { name, userId: user.id },
      {
        onSuccess: () => {
          notify({ title: _e('flashcardset.createNewSetSuccessfully') })
          setIsDialogOpen(false)
        },
      },
    )
  }

  const doUpdateSet = (set) => (name) =>
    updateSet.mutate(
      { id: set.id, name, userId: set.user_id },
      {
        onSuccess: () => {
          notify({ title: _e('flashcardset.updateNameSuccessfully') })
        },
      },
    )

  const doDeleteSet = (id) => () =>
    deleteSet.mutate(
      { id },
      {
        onSuccess: () => {
          notify({ title: _e('flashcardset.deleteSetSuccessfully') })
        },
      },
    )

  if (isLoading) return <Layout loading />

  const links = [
    { href: '/', name: _e('nav.home') },
    { href: '/flashcards', name: _e('nav.flashcards') },
  ]

  const openDialog = () => setIsDialogOpen(true)

  return (
    <Layout>
      <div className="mb-4 flex items-center justify-between">
        <Breadcrumb links={links} />
        <Button className="flex items-center gap-2" onClick={openDialog}>
          <PlusIcon className="h-5 w-5" />{' '}
          <span className="">{_e('flashcardset.create')}</span>
        </Button>
      </div>

      {/* Create new flashcard set */}
      <CreateNewSetDialog
        onCreateNewSet={doCreateNewSet}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        loading={createNewSet.isLoading}
      />
      {createNewSet.isError && (
        <Alert variant="danger">{_e('flashcardset.error.createNewSet')}</Alert>
      )}

      {updateSet.isError && (
        <Alert variant="danger">
          {_e('flashcardset.error.updateNameFail')}
        </Alert>
      )}

      {deleteSet.isError && (
        <Alert variant="danger">{_e('flashcardset.error.deleleSet')}</Alert>
      )}

      <div className="mb-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {flashcardSets.map((set) => (
            <FlashcardSet
              key={set.id}
              set={set}
              doUpdateSet={doUpdateSet(set)}
              doDeleteSet={doDeleteSet(set.id)}
              isUpdateLoading={updateSet.isLoading}
              isDeleteLoading={deleteSet.isLoading}
            />
          ))}
        </div>
      </div>

      {/* Navigators */}
      <PageNavigation page={page} total={total} perPage={PER_PAGE} />
    </Layout>
  )
}
