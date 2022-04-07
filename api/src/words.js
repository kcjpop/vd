const { getAllTenses } = require('./domain-logic/verb-tenses')
const { getPronunciations } = require('./domain-logic/pronunciation')
const Envi = require('./domain-logic/en-vi')
const Wordnet = require('./domain-logic/wordnet')

exports.getSingleWord = async function getSingleWord({ word, dict }) {
  const entry =
    dict === 'wordnet'
      ? await Wordnet.getDefinitions(word)
      : await Envi.getDefinitions(word)

  if (!entry) return

  const [tenses, pronunciations] = await Promise.all([
    getAllTenses(word),
    getPronunciations(word),
  ])

  entry.tenses = tenses ?? null
  entry.pronunciations = pronunciations ?? null

  return entry
}
