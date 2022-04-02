import { getAllTenses } from '@/lib/domain-logic/verbTenses'
import { getDefinitions } from '@/lib/domain-logic/en-vi'
import { getSingleWord } from '@/lib/domain-logic/wordnet'

export default async function handler(req, res) {
  try {
    const { dict } = req.query
    const { word } = req.query

    const entry =
      dict === 'wordnet'
        ? await getSingleWord(word)
        : await getDefinitions(word)

    if (!entry) {
      res.status(404).json({ error: 'Word not found' })
      return
    }

    const result = { ...entry }
    const tenses = await getAllTenses(word)

    result.tenses = tenses ?? null

    res.status(200).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to load data' })
  }
}
