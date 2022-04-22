import { useState, useEffect, useRef, useContext } from 'react'

import { ToastContext } from '../../context/Toast'
import { Dialog } from '../common/Dialog'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Textarea } from '../common/Textarea'
import { Select } from '../common/Select'

import { useTranslation } from '../../i18n'
import { useFlashcardSets, useFlashcards } from '../../domain-logic/flashcards'
import { useUser } from '../../domain-logic/auth'

function CreateFlashcardSetForm({
  toggleIsCreating,
  setFlashcard,
  setMessage,
  hidden,
  upsertFlashcardSet,
}) {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const inputRef = useRef()
  const { user } = useUser()

  const { _e } = useTranslation()

  const updateName = (e) => setName(e.target.value)

  const doCreate = async (e) => {
    try {
      e.preventDefault()

      const entry = await upsertFlashcardSet({
        name: name,
        user_id: user.id,
      })

      setFlashcard((old) => ({ ...old, set_id: entry.id }))
      setMessage(_e('flashcard.createdSetSuccessfully'))
      toggleIsCreating()
    } catch (error) {
      setError(error)
    }
  }

  const cancel = (e) => {
    e.preventDefault()

    toggleIsCreating()
  }

  useEffect(() => {
    if (!hidden && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef, hidden])

  return (
    <form className={`flex w-80 flex-col gap-2 ${hidden && 'hidden'}`}>
      <label className="">{_e('flashcard.addNewSet')}</label>
      <Input
        ref={inputRef}
        type="text"
        value={name}
        onChange={updateName}
        placeholder={_e('flashcard.newSetName')}
      />
      <div className="grid w-full grid-cols-2 grid-rows-1 gap-2">
        <Button
          className="bg-sky-200"
          onClick={doCreate}
          disabled={name.length === 0}>
          {_e('common.create')}
        </Button>
        <Button className="btn__contained" onClick={cancel}>
          {_e('common.cancel')}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}

function AddFlashcardForm({
  toggleIsCreating,
  flashcardSets,
  upsertFlashcard,
  hidden,
  flashcard,
  setFlashcard,
  handleOpenChange,
}) {
  const { _e } = useTranslation()
  const [error, setError] = useState()
  const { notify } = useContext(ToastContext)

  async function doAddFlashcard(e) {
    try {
      e.preventDefault()
      setError(null)

      const fc = await upsertFlashcard(flashcard)

      setFlashcard(fc)
      handleOpenChange(false)
      notify({ title: _e('flashcard.addedSuccessfully') })
    } catch (error) {
      console.log({ error })
      setError(_e('error.failedToCreateFlashcard'))
    }
  }

  const updateFlashcard = (e) =>
    setFlashcard({ ...flashcard, [e.target.name]: e.target.value })

  return (
    <form className={`flex w-80 flex-col gap-2 ${hidden && 'hidden'}`}>
      <label className="">{_e('flashcard.set')}</label>
      <div className="flex items-center">
        <Select
          name="set_id"
          value={flashcard.set_id}
          onChange={updateFlashcard}
          className="flex-1 p-2">
          <option value="">-- Select a set --</option>
          {flashcardSets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </Select>

        <Button
          className="btn btn__contained btn__primary ml-2"
          onClick={toggleIsCreating}>
          {_e('flashcard.addNewSet')}
        </Button>
      </div>

      <label className="">{_e('flashcard.word')}</label>
      <Input
        type="text"
        name="word"
        className="rounded bg-slate-200"
        value={flashcard.word}
        onChange={updateFlashcard}
      />
      <label className="">{_e('flashcard.definition')}</label>
      <Textarea
        name="definition"
        id=""
        className="rounded bg-slate-200"
        value={flashcard.definition}
        onChange={updateFlashcard}></Textarea>

      {error && <p className="text-red-600">{error}</p>}

      <Button
        className="bg-sky-200"
        onClick={doAddFlashcard}
        disabled={flashcard.set_id === ''}>
        {_e('flashcard.add')}
      </Button>
    </form>
  )
}

export function FlashcardDialog({ open, onOpenChange, word, definition }) {
  const [isCreating, setIsCreating] = useState(false)
  const [flashcard, setFlashcard] = useState({
    word,
    definition: definition?.meaning,
    set_id: '',
  })
  const [message, setMessage] = useState()

  const { _e } = useTranslation()
  const { flashcardSets, upsertFlashcardSet } = useFlashcardSets()
  const { upsertFlashcard } = useFlashcards(flashcard.set_id)

  function toggleIsCreating(e) {
    e && e.preventDefault()

    setIsCreating((old) => !old)
  }

  function handleOpenChange(state) {
    setIsCreating(false)
    onOpenChange(state)
  }

  useEffect(() => {
    if (open && definition) {
      setFlashcard((flashcard) => ({
        ...flashcard,
        definition: definition.meaning,
      }))
    }
  }, [open, definition])

  useEffect(() => console.log({ flashcardSets }), [flashcardSets])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className="p-2">
        <h2 className="font-bold">{_e('flashcard.create')}</h2>
        {message && <p className="text-sky-400">{message}</p>}
        <AddFlashcardForm
          {...{
            setFlashcard,
            toggleIsCreating,
            flashcardSets,
            flashcard,
            upsertFlashcard,
            hidden: isCreating,
            handleOpenChange,
          }}
        />
        <CreateFlashcardSetForm
          {...{
            toggleIsCreating,
            setFlashcard,
            setMessage,
            upsertFlashcardSet,
            hidden: !isCreating,
          }}
        />
      </div>
    </Dialog>
  )
}
