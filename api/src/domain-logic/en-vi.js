const { getDb } = require('./db')

const EN_VI_DB = 'en-vi.db'
const db = getDb(EN_VI_DB)

/**
 * Get word from db
 * @param {string} word
 */
exports.getDefinitions = async function getDefinitions(word) {
  const sql = `
select part_of_speech, definitions, phrases
from words
join defs using (word_id)
where word = ?`

  const definitions = db.prepare(sql).all(word)

  if (!definitions?.length) return

  return {
    word,
    definitions: definitions.map((d) => ({
      partOfSpeech: d.part_of_speech,
      definitions: d.definitions ? JSON.parse(d.definitions) : null,
      idioms: d.phrases ? JSON.parse(d.phrases) : null,
    })),
  }
}
