import { useState, useEffect, useRef, useContext } from 'react'

import { ToastContext } from '../../context/Toast'
import { Dialog } from '../common/Dialog'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Textarea } from '../common/Textarea'
import { Select } from '../common/Select'

import { useTranslation } from '../../i18n'
import { useFlashcardSets } from '../../hooks/flashcards/useFlashcardSets'
import { useFlashcards } from '../../hooks/flashcards/useFlashcards'
import { useUser } from '../../domain-logic/auth'

function CreateFlashcardSetForm({
  toggleIsCreating,
  setMessage,
  hidden,
  modifyFlashcardSet,
  setFSetId,
}) {
  const [name, setName] = useState('')
  const inputRef = useRef()

  const { _e } = useTranslation()

  const updateName = (e) => setName(e.target.value)

  const doCreate = async (e) => {
    e.preventDefault()

    await modifyFlashcardSet.mutateAsync(
      { name },
      {
        onSuccess: (data, ...rest) => {
          setFSetId(data.id)
          setMessage(_e('flashcard.createdSetSuccessfully'))
          toggleIsCreating()
        },
      },
    )
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
          className="bg-sky-200 hover:bg-sky-300"
          onClick={doCreate}
          disabled={name.length === 0}>
          {_e('common.create')}
        </Button>
        <Button className="bg-slate-200 hover:bg-slate-300" onClick={cancel}>
          {_e('common.cancel')}
        </Button>
      </div>
      {modifyFlashcardSet.isError && (
        <p className="text-red-500">{modifyFlashcardSet.error.message}</p>
      )}
    </form>
  )
}

function AddFlashcardForm({
  toggleIsCreating,
  flashcardSets,
  modifyFlashcard,
  hidden,
  fWord,
  fSetId,
  fDefinition,
  handleFlashcardChange,
  handleOpenChange,
}) {
  const { _e } = useTranslation()
  const { notify } = useContext(ToastContext)

  async function doAddFlashcard(e) {
    e.preventDefault()

    await modifyFlashcard.mutateAsync(
      {
        word: fWord,
        definition: fDefinition,
        set_id: fSetId,
      },
      {
        onSuccess: () => {
          handleOpenChange(false)
          notify({ title: _e('flashcard.addedSuccessfully') })
        },
      },
    )
  }

  return (
    <form className={`flex w-80 flex-col gap-2 ${hidden && 'hidden'}`}>
      <label className="">{_e('flashcard.set')}</label>
      <div className="flex items-center">
        <Select
          name="setId"
          value={fSetId}
          onChange={handleFlashcardChange}
          className="flex-1 p-2">
          <option value="">-- Select a set --</option>
          {flashcardSets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </Select>

        <Button
          className="ml-2 bg-sky-200 hover:bg-sky-300"
          onClick={toggleIsCreating}>
          {_e('flashcard.addNewSet')}
        </Button>
      </div>

      <label className="">{_e('flashcard.word')}</label>
      <Input
        type="text"
        name="word"
        className="rounded bg-slate-200"
        value={fWord}
        onChange={handleFlashcardChange}
      />

      <label className="">{_e('flashcard.definition')}</label>
      <Textarea
        name="definition"
        id=""
        className="rounded bg-slate-200"
        value={fDefinition}
        onChange={handleFlashcardChange}></Textarea>

      {modifyFlashcard.isError && (
        <p className="text-red-600">{modifyFlashcard.error.message}</p>
      )}

      <Button
        className="bg-sky-200 hover:bg-sky-300"
        onClick={doAddFlashcard}
        disabled={fSetId === ''}>
        {_e('flashcard.add')}
      </Button>
    </form>
  )
}

export function FlashcardDialog({ open, onOpenChange, word, definition }) {
  const [isCreating, setIsCreating] = useState(false)

  const [fWord, setFWord] = useState(word)
  const [fDefinition, setFDefinition] = useState(definition?.meaning)
  const [fSetId, setFSetId] = useState('')
  const [message, setMessage] = useState()

  const { _e } = useTranslation()
  const { user } = useUser({ redirectIfUnauthenticated: false })

  const { flashcardSets, modifyFlashcardSet } = useFlashcardSets({
    user,
  })
  const { modifyFlashcard } = useFlashcards({ setId: fSetId, user })

  function toggleIsCreating(e) {
    e && e.preventDefault()

    setIsCreating((old) => !old)
  }

  function handleOpenChange(state) {
    setIsCreating(false)
    onOpenChange(state)
  }

  function handleFlashcardChange(e) {
    switch (e.target.name) {
      case 'word': {
        setFWord(e.target.value)
        break
      }
      case 'definition': {
        setFDefinition(e.target.value)
        break
      }
      case 'setId': {
        setFSetId(e.target.value)
        break
      }
      default:
        break
    }
  }

  useEffect(() => {
    if (open && definition) {
      setFDefinition(definition?.meaning || '')
    }
  }, [open, definition])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className="p-2">
        <h2 className="font-bold">{_e('flashcard.create')}</h2>
        {message && <p className="text-green-600">{message}</p>}
        <AddFlashcardForm
          {...{
            toggleIsCreating,
            flashcardSets,
            fWord,
            fDefinition,
            fSetId,
            modifyFlashcard,
            hidden: isCreating,
            handleOpenChange,
            handleFlashcardChange,
          }}
        />
        <CreateFlashcardSetForm
          {...{
            toggleIsCreating,
            setMessage,
            modifyFlashcardSet,
            hidden: !isCreating,
            setFSetId,
          }}
        />
      </div>
    </Dialog>
  )
}
