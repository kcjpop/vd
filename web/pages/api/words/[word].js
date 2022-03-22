import { parser } from 'lib/parser'

export default function getWords(req, res) {
  const { word: keyword } = req.query

  const payload = parser(keyword)

  if (payload) {
    res.status(200).json(payload)
  } else {
    res.status(404).json({ error: `${keyword} not found!` })
  }
}
