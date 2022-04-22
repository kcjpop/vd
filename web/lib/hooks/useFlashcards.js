import { useState, useEffect, useCallback } from 'react'
import { supabase as sb } from '../domain-logic/supabaseClient'
import { useUser } from '../domain-logic/auth'

const TB = { FlashcardSets: 'flashcard_sets', Flashcards: 'flashcards' }
const config = {
  count: 'exact',
  returning: 'representation',
}

const getFlashcardSets = (
  { userId },
  { fields } = { fields: 'id, name, flashcards(*)' },
) => sb.from(TB.FlashcardSets).select(fields).eq('user_id', userId)

const getFlashcardSet = (
  { id, userId },
  { fields } = { fields: 'id, name, flashcards(*)' },
) =>
  sb
    .from(TB.FlashcardSets)
    .select(fields)
    .eq('user_id', userId)
    .eq('id', id)
    .single()

const upsertFlashcardSets = (sets) =>
  sb.from(TB.FlashcardSets).upsert(sets, config)

const deleteFlashcardSet = ({ id }) =>
  sb.from(TB.FlashcardSets).delete().match({ id })

const getFlashcards = ({ setId }, { fields } = { fields: '*' }) =>
  sb.from(TB.Flashcards).select(fields, config).eq('set_id', setId)

const upsertFlashcards = (flashcards) =>
  sb.from(TB.Flashcards).upsert(flashcards, config)

const deleteFlashcards = ({ id }) =>
  sb.from(TB.Flashcards).delete().match({ id })

export function useFlashcardSets() {
  const [flashcardSets, setFlashcardSets] = useState([])
  const { user } = useUser({ redirectIfUnauthenticated: false })

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

export function useFlashcardSet({ setId }) {
  const [currentSet, setCurrentSet] = useState(null)
  const { user } = useUser({ redirectIfUnauthenticated: false })

  useEffect(() => {
    const getCurrentSet = async () => {
      const { data, error } = await getFlashcardSet({
        id: setId,
        userId: user.id,
      })

      if (error) throw error
      setCurrentSet(data)
    }

    user && getCurrentSet()
  }, [user, setId])

  return { currentSet }
}

export function useFlashcards({ setId }) {
  const [flashcards, setFlashcards] = useState([])
  const [total, setTotal] = useState(0)
  const { user } = useUser({ redirectIfUnauthenticated: false })

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
