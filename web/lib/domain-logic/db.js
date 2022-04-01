import path from 'path'
import Database from 'better-sqlite3'

export async function getDb(dbName) {
  if (!dbName) throw new Error('Database name is required')

  const filename = path.join(process.cwd(), 'db/' + dbName)
  return new Database(filename, { readonly: true })
}
