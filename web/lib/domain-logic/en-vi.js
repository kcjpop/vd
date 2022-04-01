import { getDb } from './db'
import { parse } from '@/lib/parser'

const EN_VI_DB = 'en-vi.db'

/**
 * Get word from db
 * @param {string} word
 */
export async function getDefinitions(word) {
  const db = await getDb(EN_VI_DB)

  const sql = `
SELECT id, group_concat(glossary, '<br>') as glossary
FROM words
WHERE word = :word`

  const entry = await db.get(sql, { ':word': word })

  return parse(entry?.glossary)
}
