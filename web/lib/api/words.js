import { getAllTenses } from '../domain-logic/verbTenses'
import { getPronunciations } from '../domain-logic/pronunciation'
import * as Envi from '../domain-logic/en-vi'
import * as Wordnet from '../domain-logic/wordnet'

export async function getSingleWord({ word, dict }) {
  const entry =
    dict === 'wordnet'
      ? await Wordnet.getSingleWord(word)
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
