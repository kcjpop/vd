const { getAllTenses } = require('./verb-tenses')
const { getPronunciations } = require('./pronunciation')
const { getDefinitions } = require('./getDefinitions')

async function getSingleWord({ word, dict = 'en-vi' }) {
  const entry = await getDefinitions(dict, word)

  if (!entry) return null

  const [tenses, pronunciations] = await Promise.all([
    getAllTenses(word),
    getPronunciations(word),
  ])

  entry.tenses = tenses ?? null
  entry.pronunciations = pronunciations ?? null

  return entry
}

module.exports = { getSingleWord }
