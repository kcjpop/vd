import { useState, useEffect, useCallback } from 'react'

import {
  getFlashcardSets,
  upsertFlashcardSets,
  deleteFlashcardSet,
} from './query'

export function useFlashcardSets({ user }) {
  const [flashcardSets, setFlashcardSets] = useState([])

  const fetchFlashcardSets = useCallback(async () => {
    const { data: sets, error } = await getFlashcardSets({ userId: user.id })

    if (error) throw error
    setFlashcardSets(sets)
  }, [user])

  async function modify(set) {
    const { data, error } = await upsertFlashcardSets(set)

    if (error) throw error
    setFlashcardSets([...flashcardSets, ...data])

    return data[0]
  }

  async function remove(id) {
    const { error } = await deleteFlashcardSet({ id })

    if (error) throw error

    setFlashcardSets(flashcardSets.filter((set) => set.id !== id))
  }

  useEffect(() => {
    user && fetchFlashcardSets()
  }, [user, fetchFlashcardSets])

  return { flashcardSets, modify, remove }
}
