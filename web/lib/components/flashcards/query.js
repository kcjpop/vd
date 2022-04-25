import { supabase as sb } from '../../supabaseClient'

const TBL_FLASHCARDS = 'flashcards'
const TBL_SETS = 'flashcard_sets'

const config = {
  count: 'exact',
  returning: 'representation',
}

export const getAllSets = (
  { userId },
  { fields } = { fields: 'id, name, flashcards(id)' },
) => sb.from(TBL_SETS).select(fields).eq('user_id', userId)

export const getPaginatedSets = (
  { userId, from, to },
  { fields } = { fields: 'id, name, flashcards(id)' },
) => sb.from(TBL_SETS).select(fields).eq('user_id', userId).range(from, to)

export const getFlashcardSet = (
  { id, userId },
  { fields } = { fields: 'id, name, flashcards(*)' },
) =>
  sb.from(TBL_SETS).select(fields).eq('user_id', userId).eq('id', id).single()

export const upsertSet = (set) => sb.from(TBL_SETS).upsert(set, config)

export const deleteFlashcardSet = ({ id }) =>
  sb.from(TBL_SETS).delete().match({ id })

export const getFlashcards = ({ setId }, { fields } = { fields: '*' }) =>
  sb.from(TBL_FLASHCARDS).select(fields, config).eq('set_id', setId)

export const upsertFlashcard = (flashcard) =>
  sb.from(TBL_FLASHCARDS).upsert(flashcard, config)

export const deleteFlashcards = ({ id }) =>
  sb.from(TBL_FLASHCARDS).delete().match({ id })
