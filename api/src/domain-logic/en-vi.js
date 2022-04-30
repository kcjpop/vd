const { getDb } = require('../db')

const EN_VI_DB = 'en-vi.db'
const db = getDb(EN_VI_DB)

exports.count = async function count() {
  const sql = 'SELECT COUNT(DISTINCT word) as count FROM words'

  const summary = db.prepare(sql).get()

  return summary.count
}

exports.getSuggestions = async function ({ word, limit = 10 }) {
  let limitNumber = Number(limit)
  limitNumber = limitNumber > 50 || limitNumber < 0 ? 50 : limitNumber

  const sql = `SELECT DISTINCT word, rank
  FROM suggestions
  WHERE suggestions MATCH ?
  ORDER BY rank
  LIMIT ?`
  const suggestions = db.prepare(sql).all(`^${word}*`, limitNumber)

  return suggestions
}
