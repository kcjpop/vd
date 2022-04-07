const path = require('path')
const Database = require('better-sqlite3')

exports.getDb = function getDb(dbName, options) {
  if (!dbName) throw new Error('Database name is required')

  const filename = path.join(process.cwd(), 'db/' + dbName)
  return new Database(filename, { readonly: true, ...options })
}
