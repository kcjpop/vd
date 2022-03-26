import { getDb } from './db'
import { parse } from '@/lib/parser'

const EN_VI_DB = 'en-vi.db'

/**
 * Get word from db
 * @param {string} word
 */
export async function getDefinitions(word) {
  const db = await getDb(EN_VI_DB)

  const entry = await db.get('SELECT glossary FROM words WHERE word = :word', {
    ':word': word,
  })

  if (entry?.glossary && entry.glossary !== '') {
    return parse(entry.glossary)
  }
}
