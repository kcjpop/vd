const { getEnViDb, getWordnetDb } = require('../db')

function countEnVi() {
  const db = getEnViDb()
  const sql = 'SELECT COUNT(DISTINCT word) as count FROM words'

  const summary = db.prepare(sql).get()

  return summary.count
}

function countWordnet() {
  const db = getWordnetDb()
  const sql = `SELECT COUNT(DISTINCT lemma) AS count FROM words`

  const summary = db.prepare(sql).get()

  return summary.count
}

exports.getDictSummaries = async function getDictSummaries() {
  return { EnVi: countEnVi(), Wordnet: countWordnet() }
}
