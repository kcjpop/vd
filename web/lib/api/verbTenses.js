import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const DB_PATH = './db/verb-tenses.db'

async function getDb() {
  return open({
    filename: DB_PATH,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  })
}

/**
 * Get all tenses of a verb
 * @param {string} verb
 */
export async function getAllTenses(verb) {
  const db = await getDb()

  const item = await db.get(
    'SELECT * FROM verb_tenses WHERE infinitive = ?',
    verb,
  )

  // Strip empty columns
  if (item) {
    return Object.fromEntries(Object.entries(item).filter(([, v]) => v !== ''))
  }
}
