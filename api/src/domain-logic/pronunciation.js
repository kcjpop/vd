const { getDb } = require('./db')

const DB = 'pronunciation.db'

/**
 * Get pronunciations of a word
 * @param {string} word
 */
exports.getPronunciations = async function getPronunciations(word) {
  const db = await getDb(DB)

  const rows = db
    .prepare('SELECT ipa FROM pronunciations WHERE word = ?')
    .all(word)

  return rows?.map((row) => row.ipa)
}
