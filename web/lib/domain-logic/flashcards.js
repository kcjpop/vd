import { useState, useEffect } from 'react'
import { supabase as sb } from './supabaseClient'
import { useUser } from './auth'

const TB = { FlashcardSets: 'flashcard_sets', Flashcards: 'flashcards' }

/* eslint-disable camelcase */
const FlashcardSets = {
  get: ({ user_id }) =>
    sb.from(TB.FlashcardSets).select('id, name').eq('user_id', user_id),
  upsert: (set) =>
    sb
      .from(TB.FlashcardSets)
      .upsert(set, { count: 'exact', returning: 'representation' }),
  delete: ({ id }) => sb.from(TB.FlashcardSets).delete().match({ id }),
}

const Flashcards = {
  get: ({ set_id }) => sb.from(TB.Flashcards).select('*').eq('set_id', set_id),
  upsert: (flashcard) =>
    sb.from(TB.Flashcards).upsert(flashcard, {
      count: 'exact',
      returning: 'representation',
    }),
  delete: ({ id }) => sb.from(TB.Flashcards).delete().match({ id }),
}

export function useFlashcardSets() {
  const [flashcardSets, setFlashcardSets] = useState([])
  const { user } = useUser({ redirectIfUnauthenticated: false })

  async function fetchFlashcardSets() {
    const { data: sets, error } = await FlashcardSets.get({ user_id: user.id })

    if (error) throw error // catch như thế nào đây
    setFlashcardSets(sets)
  }

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

export function useFlashcards({ set_id }) {
  const [flashcards, setFlashcards] = useState([])
  const { user } = useUser({ redirectIfUnauthenticated: false })

  async function fetchFlashcards() {
    const { data: flashcards, error } = await Flashcards.get({ set_id })

    if (error) throw error
    setFlashcards(flashcards)
  }

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

  return { flashcards, fetchFlashcards, upsertFlashcard, deleteFlashcard }
}

/* eslint-enable camelcase */
