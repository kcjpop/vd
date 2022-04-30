const { getEnViDb } = require('../db')

async function getSuggestions({ word, limit = 10 }) {
  const db = getEnViDb()

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

module.exports = { getSuggestions }
