import { getAllTenses } from '@/lib/domain-logic/verbTenses'
import { getDefinitions } from '@/lib/domain-logic/definitions'

export default async function handler(req, res) {
  try {
    const tenses = await getAllTenses(req.query.word)
    const definitions = await getDefinitions(req.query.word)

    const result = {}
    result.tenses = tenses ?? null
    result.defintions = definitions ?? null

    res.status(200).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to load data' })
  }
}
