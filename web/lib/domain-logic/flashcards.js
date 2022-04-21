import { useState, useEffect, useCallback } from 'react'
import { supabase as sb } from './supabaseClient'
import { useUser } from './auth'

const TB = { FlashcardSets: 'flashcard_sets', Flashcards: 'flashcards' }
const getConfig = (config = {}) => ({
  count: 'exact',
  returning: 'representation',
  ...config,
})

/* eslint-disable camelcase */
const FlashcardSets = {
  get: ({ user_id }) =>
    sb
      .from(TB.FlashcardSets)
      .select('id, name, flashcards(*)')
      .eq('user_id', user_id),
  getOne: ({ user_id, id }) =>
    sb
      .from(TB.FlashcardSets)
      .select('id, name, flashcards (*)', getConfig())
      .eq('id', id)
      .eq('user_id', user_id)
      .single(),
  upsert: (set) => sb.from(TB.FlashcardSets).upsert(set, getConfig()),
  delete: ({ id }) => sb.from(TB.FlashcardSets).delete().match({ id }),
}

const Flashcards = {
  get: ({ set_id }) =>
    sb.from(TB.Flashcards).select('*', { count: 'exact' }).eq('set_id', set_id),
  upsert: (flashcard) => sb.from(TB.Flashcards).upsert(flashcard, getConfig()),
  delete: ({ id }) => sb.from(TB.Flashcards).delete().match({ id }),
}

export function useFlashcardSets() {
  const [flashcardSets, setFlashcardSets] = useState([])
  const { user } = useUser({ redirectIfUnauthenticated: false })

  const fetchFlashcardSets = useCallback(async () => {
    const { data: sets, error } = await FlashcardSets.get({ user_id: user.id })

    if (error) throw error // catch như thế nào đây
    setFlashcardSets(sets)
  }, [user])

  async function upsertFlashcardSet(set) {
    const { data, error } = await FlashcardSets.upsert(set)

    if (error) throw error

    setFlashcardSets([...flashcardSets, ...data])

    return data[0]
  }

  async function deleteFlashcardSet(id) {
    const { error } = await FlashcardSets.delete({ id })

    if (error) throw error

    setFlashcardSets(flashcardSets.filter((set) => set.id !== id))
  }

  useEffect(() => {
    user && fetchFlashcardSets()
  }, [user, fetchFlashcardSets])

  return { flashcardSets, upsertFlashcardSet, deleteFlashcardSet }
}

export function useFlashcardSet({ set_id }) {
  const [currentSet, setCurrentSet] = useState(null)
  const { user } = useUser({ redirectIfUnauthenticated: false })

  useEffect(() => {
    const getCurrentSet = async () => {
      const { data, error } = await FlashcardSets.getOne({
        id: set_id,
        user_id: user.id,
      })

      if (error) throw error
      setCurrentSet(data)
    }

    user && getCurrentSet()
  }, [user, set_id])

  return { currentSet }
}

export function useFlashcards({ set_id }) {
  const [flashcards, setFlashcards] = useState([])
  const [total, setTotal] = useState(0)
  const { user } = useUser({ redirectIfUnauthenticated: false })

  const fetchFlashcards = useCallback(async () => {
    const { data: flashcards, error, count } = await Flashcards.get({ set_id })

    if (error) throw error

    setFlashcards(flashcards)
    setTotal(count)
  }, [set_id])

  async function upsertFlashcard(flashcard) {
    const { data, error } = await Flashcards.upsert(flashcard)

    if (error) throw error
    setFlashcards([...flashcards, ...data])

    return data[0]
  }

  async function deleteFlashcard(id) {
    const { error } = await Flashcards.delete({ id })

    if (error) throw error

    setFlashcards(flashcards.filter((fc) => fc.id !== id))
  }

  useEffect(() => {
    user && set_id && fetchFlashcards()
  }, [user, set_id, fetchFlashcards])

  return {
    flashcards,
    total,
    fetchFlashcards,
    upsertFlashcard,
    deleteFlashcard,
  }
}

/* eslint-enable camelcase */
