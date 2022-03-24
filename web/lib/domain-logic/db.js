import path from 'path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function getDb(dbName) {
  if (!dbName) throw new Error('Database name is required')

  const filename = path.join(process.cwd(), 'db/' + dbName)

  return open({
    filename,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  })
}
