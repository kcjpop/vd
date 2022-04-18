import { useState, useEffect } from 'react'

import { Dialog } from '../common/Dialog'
import { useTranslation } from '../../i18n'
import { useFlashcardSets, useFlashcards } from '../../domain-logic/flashcards'
import { useUser } from '../../domain-logic/auth'

export function FlashcardDialog({ open, onOpenChange, word, definition }) {
  const [isCreating, setIsCreating] = useState(false)
  const [newSet, setNewSet] = useState({ name: '' })
  const [flashcard, setFlashcard] = useState({
    word,
    definition: definition?.meaning,
    set_id: '',
  })
  const { _e } = useTranslation()

  const { flashcardSets, upsertFlashcardSet } = useFlashcardSets()
  const { upsertFlashcard } = useFlashcards(flashcard.set_id)
  const { user } = useUser()

  async function doCreate(e) {
    e.preventDefault()

    if (!isCreating) {
      setIsCreating(true)
    } else {
      const entry = await upsertFlashcardSet({
        ...newSet,
        user_id: user.id,
      })

      setIsCreating(false)
      setFlashcard({ ...flashcard, set_id: entry.id })
    }
  }

  async function doAddFlashcard(e) {
    e.preventDefault()

    await upsertFlashcard(flashcard)
    onOpenChange(false)
  }

  function updateSetName(e) {
    setNewSet({ ...newSet, name: e.target.value })
  }

  function updateFlashcard(e) {
    setFlashcard({ ...flashcard, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (open && definition && !flashcard.definition) {
      setFlashcard({ ...flashcard, definition: definition.meaning })
    }
  }, [open, definition, flashcard])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="p-2">
        <h2 className="font-bold">{_e('flashcard.create')}</h2>
        <form className="flex w-80 flex-col gap-2">
          <label className="">{_e('flashcard.set')}</label>
          <div className="flex items-center">
            <input
              type="text"
              value={newSet.name}
              onChange={updateSetName}
              placeholder={_e('flashcard.newSetName')}
              className={`${!isCreating} && hidden`}
            />
            <select
              name="set_id"
              value={flashcard.set_id}
              onChange={updateFlashcard}
              className={`flex-1 p-2 ${isCreating && 'hidden'}`}>
              {flashcardSets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
            </select>

            <button
              className="ml-2 rounded border bg-sky-300 p-2 hover:bg-sky-400"
              onClick={doCreate}>
              {_e('flashcard.addNewSet')}
            </button>
          </div>

          <label className="">{_e('flashcard.word')}</label>
          <input
            type="text"
            name="word"
            className="rounded bg-slate-200"
            value={flashcard.word}
            onChange={updateFlashcard}
          />
          <label className="">{_e('flashcard.definition')}</label>
          <textarea
            name="definition"
            id=""
            className="rounded bg-slate-200"
            value={flashcard.definition}
            onChange={updateFlashcard}></textarea>

          <button className="bg-sky-200" onClick={doAddFlashcard}>
            {_e('flashcard.add')}
          </button>
        </form>
      </div>
    </Dialog>
  )
}
