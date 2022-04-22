import { supabase as sb } from '../../domain-logic/supabaseClient'

const TB = { FlashcardSets: 'flashcard_sets', Flashcards: 'flashcards' }
const config = {
  count: 'exact',
  returning: 'representation',
}

export const getFlashcardSets = (
  { userId },
  { fields } = { fields: 'id, name, flashcards(*)' },
) => sb.from(TB.FlashcardSets).select(fields).eq('user_id', userId)

export const getFlashcardSet = (
  { id, userId },
  { fields } = { fields: 'id, name, flashcards(*)' },
) =>
  sb
    .from(TB.FlashcardSets)
    .select(fields)
    .eq('user_id', userId)
    .eq('id', id)
    .single()

export const upsertFlashcardSets = (sets) =>
  sb.from(TB.FlashcardSets).upsert(sets, config)

export const deleteFlashcardSet = ({ id }) =>
  sb.from(TB.FlashcardSets).delete().match({ id })

export const getFlashcards = ({ setId }, { fields } = { fields: '*' }) =>
  sb.from(TB.Flashcards).select(fields, config).eq('set_id', setId)

export const upsertFlashcards = (flashcards) =>
  sb.from(TB.Flashcards).upsert(flashcards, config)

export const deleteFlashcards = ({ id }) =>
  sb.from(TB.Flashcards).delete().match({ id })
