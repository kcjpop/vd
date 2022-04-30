const { getDb } = require('../db')

const VERB_TENSES_DB = 'verb-tenses.db'

/**
 * Get all tenses of a verb
 * @param {string} verb
 */
exports.getAllTenses = async function getAllTenses(verb) {
  const db = await getDb(VERB_TENSES_DB)

  const item = db
    .prepare('SELECT * FROM verb_tenses WHERE infinitive = ?')
    .get(verb)

  // Strip empty columns
  if (item) {
    return Object.fromEntries(Object.entries(item).filter(([, v]) => v !== ''))
  }
}
