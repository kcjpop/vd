import { getSingleWord } from '@/lib/api/words'

export default async function handler(req, res) {
  try {
    const result = await getSingleWord(req.query)
    if (!result) {
      res.status(404).send('')
      return
    }

    res.status(200).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('')
  }
}
