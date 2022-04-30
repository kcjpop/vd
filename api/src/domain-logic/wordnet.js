const { getDb } = require('../db')

const DB = 'wordnet.db'
const db = getDb(DB)

exports.count = async function count() {
  const sql = `SELECT COUNT(DISTINCT lemma) AS count FROM words`

  const summary = db.prepare(sql).get()

  return summary.count
}
