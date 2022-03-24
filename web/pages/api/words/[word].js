import { getAllTenses } from '@/lib/api/verbTenses'

export default async function handler(req, res) {
  try {
    const tenses = await getAllTenses(req.query.word)

    const result = {}
    result.tenses = tenses ?? null

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
