const path = require('path')
const Database = require('better-sqlite3')

exports.getDb = function getDb(dbName) {
  if (!dbName) throw new Error('Database name is required')

  const filename = path.join(process.cwd(), 'src/db/' + dbName)
  return new Database(filename, { readonly: true })
}
