const { getDb } = require('../db')

const EN_VI_DB = 'en-vi.db'
const db = getDb(EN_VI_DB)

exports.count = async function count() {
  const sql = 'SELECT COUNT(DISTINCT word) as count FROM words'

  const summary = db.prepare(sql).get()

  return summary.count
}
