import { parser } from 'lib/newParser'

export default function (req, res) {
  const { word: keyword } = req.query

  const payload = parser(keyword)

  if (payload) {
    res.status(200).json(payload)
  } else {
    res.status(400).json({ error: `${keyword} not found!` })
  }
}
