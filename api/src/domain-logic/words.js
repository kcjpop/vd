const { getAllTenses } = require('./verb-tenses')
const { getPronunciations } = require('./pronunciation')
const Envi = require('./en-vi')
const Wordnet = require('./wordnet')

exports.getSingleWord = async function getSingleWord({ word, dict }) {
  const entry =
    dict === 'wordnet'
      ? await Wordnet.getDefinitions(word)
      : await Envi.getDefinitions(word)

  if (!entry) return null

  const [tenses, pronunciations] = await Promise.all([
    getAllTenses(word),
    getPronunciations(word),
  ])

  entry.tenses = tenses ?? null
  entry.pronunciations = pronunciations ?? null

  return entry
}
