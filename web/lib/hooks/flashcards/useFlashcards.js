import { useState, useEffect, useCallback } from 'react'
import { getFlashcards, upsertFlashcards, deleteFlashcards } from './query'

export function useFlashcards({ user, setId }) {
  const [flashcards, setFlashcards] = useState([])
  const [total, setTotal] = useState(0)

  const fetch = useCallback(async () => {
    const { data: flashcards, error, count } = await getFlashcards({ setId })

    if (error) throw error

    setFlashcards(flashcards)
    setTotal(count)
  }, [setId])

  async function modify(flashcard) {
    const { data, error } = await upsertFlashcards(flashcard)
    console.log({ data, error })

    if (error) throw error
    setFlashcards([...flashcards, ...data])

    return data[0]
  }

  async function remove(id) {
    const { error } = await deleteFlashcards({ id })

    if (error) throw error
    setFlashcards(flashcards.filter((fc) => fc.id !== id))
  }

  useEffect(() => {
    user && setId && fetch()
  }, [user, setId, fetch])

  return {
    flashcards,
    total,
    fetch,
    modify,
    remove,
  }
}
