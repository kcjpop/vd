import { useEffect, useState } from 'react'
import { supabase as sb } from './supabaseClient'
import { useUser } from './auth'

/* eslint-disable camelcase, no-unused-vars */
const Tables = { Sets: 'flashcard_sets', Flashcards: 'flashcards' }

const fetchFlashcardSets = ({ user_id }) =>
  sb.from(Tables.Sets).select(`name`).eq('user_id', user_id)

const fetchFlashcards = ({ set_id }) =>
  sb.from(Tables.Flashcards).select('*').eq('set_id', set_id)

export const upsertFlashcardSet = ({ user_id, ...set }) =>
  sb.from(Tables.Sets).upsert([{ user_id, ...set }])

export const upsertFlashcard = ({ set_id, ...flashcard }) =>
  sb.from(Tables.Flashcards).upsert([{ set_id, ...flashcard }])

export const deleteFlashcardSet = ({ id }) =>
  sb.from(Tables.Sets).delete().match({ id })

export const deleteFlashcard = ({ id, set_id }) =>
  sb.from(Tables.Flashcards).delete().match({ id, set_id })

export function useFlashcards() {
  const [flashcardSets, setFlashcardSets] = useState([])

  const { user } = useUser({ redirectIfUnauthenticated: false })

  // async function getFlashcardSets() {
  //   const { data: sets, error } = await fetchFlashcardSets({ user_id: user.})
  // }

  useEffect(() => {}, [])

  return { flashcardSets }
}

/* eslint-enable camelcase,  */
