import { supabase as sb } from './supabaseClient'

/* eslint-disable camelcase */
const Tables = { Sets: 'flashcard_sets', Flashcards: 'flashcards' }

export const getFlashcardSets = async ({ user_id }) => {
  const sets = await sb.from(Tables.Sets).select(`name`).eq('user_id', user_id)

  for (let index = 0; index < sets.length; ++index) {
    const flashcards = await sb
      .from(Tables.Flashcards)
      .select('*')
      .eq('set_id', sets[index].id)

    sets[index].flashcards = flashcards
  }

  return sets
}

export const upsertFlashcardSet = ({ user_id, ...set }) =>
  sb.from(Tables.Sets).upsert([{ user_id, ...set }])

export const upsertFlashcard = ({ set_id, ...flashcard }) =>
  sb.from(Tables.Flashcards).upsert([{ set_id, ...flashcard }])

export const deleteFlashcardSet = ({ id }) =>
  sb.from(Tables.Sets).delete().match({ id })

export const deleteFlashcard = ({ id, set_id }) =>
  sb.from(Tables.Flashcards).delete().match({ id, set_id })

/* eslint-enable camelcase */
