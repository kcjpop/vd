const { getDb } = require('./db')

const EN_VI_DB = 'en-vi.db'
const db = getDb(EN_VI_DB)

/**
 * Get word from db
 * @param {string} word
 */
exports.getDefinitions = async function getDefinitions(word) {
  const sql = `
select word, part_of_speech, definitions, phrases
from words
join defs using (word_id)
where word = ? or lower(word) = ?`

  const definitions = db.prepare(sql).all(word, word.toLocaleLowerCase())

  if (!definitions?.length) return

  return {
    // We'll use the word from database because keyword may be in different cases
    word: definitions?.[0].word ?? word,
    definitions: definitions.map((d) => ({
      partOfSpeech: d.part_of_speech,
      definitions: d.definitions ? JSON.parse(d.definitions) : null,
      idioms: d.phrases ? JSON.parse(d.phrases) : null,
    })),
  }
}

exports.count = async function count() {
  const sql = 'SELECT COUNT(DISTINCT word) as count FROM words'

  const summary = db.prepare(sql).get()

  return summary.count
}

exports.getSuggestions = async function ({ word }) {
  const sql = `SELECT word FROM suggestions WHERE suggestions MATCH ? ORDER BY rank`
  const suggestions = db.prepare(sql).all(`${word}*`)

  return suggestions
}
