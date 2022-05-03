const path = require('path')
const Database = require('better-sqlite3')

function getDb(dbName, options) {
  if (!dbName) throw new Error('Database name is required')

  const dbFolder = process.env.NODE_ENV !== 'production' ? 'db-test' : 'db'

  const filename = path.join(process.cwd(), dbFolder, dbName)
  return new Database(filename, { readonly: true, ...options })
}

const getEnViDb = (options) => getDb('en-vi.db', options)

const getWordnetDb = (options) => getDb('wordnet.db', options)

module.exports = { getDb, getEnViDb, getWordnetDb }
