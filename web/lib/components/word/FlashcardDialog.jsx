import { useState, useContext } from 'react'

import { ToastContext } from '../../context/Toast'
import { Dialog } from '../common/Dialog'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Textarea } from '../common/Textarea'
import { Select } from '../common/Select'

import { useTranslation } from '../../i18n'
import { useAllSets } from '../flashcards/useAllSets'
import { useUser } from '../../domain-logic/auth'

const ADD_NEW_CARD = 1
const ADD_NEW_SET = 2

function FormAddNewCard({
  doEnterStageAddNewSet,
  user,
  className,
  onFlashcardCreated,
  ...props
}) {
  const { _e } = useTranslation()

  const [setId, setSetId] = useState()
  const [word, setWord] = useState(props.word)
  const [definition, setDefinition] = useState(props.definition?.meaning ?? '')

  const {
    flashcardSets = [],
    addCardToSet,
    isLoading,
  } = useAllSets({
    user,
    fetchAllSets: true,
  })

  const doSetValue = (setter) => (e) => setter(e.target.value)

  const doAddFlashcard = async (e) => {
    e.preventDefault()
    const card = await addCardToSet.mutate({ setId, word, definition })
    onFlashcardCreated(card)
  }

  if (isLoading) return <p>Loading…</p>

  return (
    <form
      className={`flex w-80 flex-col gap-2 ${className}`}
      onSubmit={doAddFlashcard}>
      {/* {modifyFlashcard.isError && (
        <p className="text-red-600">{modifyFlashcard.error.message}</p>
      )} */}

      <label className="">{_e('flashcard.set')}</label>
      <div className="flex items-center gap-2">
        <Select
          name="setId"
          value={setId}
          onChange={doSetValue(setSetId)}
          className="flex-1 bg-slate-200 p-2">
          <option value="">-- Select a set --</option>
          {flashcardSets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </Select>

        <Button
          type="button"
          className="border border-sky-300 bg-sky-100 text-sm font-semibold text-sky-700 hover:border-sky-400"
          onClick={doEnterStageAddNewSet}>
          {_e('flashcard.addNewSet')}
        </Button>
      </div>

      <label className="">{_e('flashcard.word')}</label>
      <Input
        type="text"
        name="word"
        className="rounded bg-slate-200"
        value={word}
        onChange={doSetValue(setWord)}
      />

      <label className="">{_e('flashcard.definition')}</label>
      <Textarea
        name="definition"
        id=""
        className="rounded bg-slate-200"
        value={definition}
        onChange={doSetValue(setDefinition)}
      />

      <Button
        type="submit"
        className="bg-sky-200 hover:bg-sky-300"
        disabled={setId == null}>
        {_e('flashcard.add')}
      </Button>
    </form>
  )
}

function FormAddNewSet({ doEnterStageAddNewCard, user, className }) {
  const { _e } = useTranslation()
  const [name, setName] = useState('')
  const { createNewSet } = useAllSets({ user, fetchAllSets: false })

  const doSetName = (e) => setName(e.target.value)

  const doCreate = async (e) => {
    e.preventDefault()
    await createNewSet.mutate({ name, userId: user.id })
    doEnterStageAddNewCard()
  }

  return (
    <form
      className={`flex w-80 flex-col gap-2 ${className}`}
      onSubmit={doCreate}>
      {/* {modifyFlashcardSet.isError && (
        <p className="text-red-500">{modifyFlashcardSet.error.message}</p>
      )} */}

      <label className="">{_e('flashcard.addNewSet')}</label>
      <Input
        type="text"
        value={name}
        onChange={doSetName}
        placeholder={_e('flashcard.newSetName')}
      />
      <div className="grid w-full grid-cols-2 grid-rows-1 gap-2">
        <Button
          type="submit"
          className="bg-sky-200 hover:bg-sky-300"
          disabled={name.length === 0}>
          {_e('common.create')}
        </Button>
        <Button
          className="bg-slate-200 hover:bg-slate-300"
          onClick={doEnterStageAddNewCard}>
          {_e('common.cancel')}
        </Button>
      </div>
    </form>
  )
}

export function FlashcardDialog({ open, onOpenChange, word, definition }) {
  const { notify } = useContext(ToastContext)
  const { _e } = useTranslation()
  const { user } = useUser()
  const [stage, setStage] = useState(ADD_NEW_CARD)

  const doEnterStageAddNewSet = () => setStage(ADD_NEW_SET)

  const doEnterStageAddNewCard = () => setStage(ADD_NEW_CARD)

  const onFlashcardCreated = () => {
    onOpenChange(false)
    notify({ title: _e('flashcard.addedSuccessfully') })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        stage === ADD_NEW_CARD
          ? _e('flashcard.create')
          : _e('flashcard.addNewSet')
      }>
      <div className="p-2">
        <FormAddNewSet
          user={user}
          doEnterStageAddNewCard={doEnterStageAddNewCard}
          className={stage === ADD_NEW_CARD && 'hidden'}
        />

        <FormAddNewCard
          user={user}
          word={word}
          definition={definition}
          doEnterStageAddNewSet={doEnterStageAddNewSet}
          onFlashcardCreated={onFlashcardCreated}
          className={stage === ADD_NEW_SET && 'hidden'}
        />
      </div>
    </Dialog>
  )
}
