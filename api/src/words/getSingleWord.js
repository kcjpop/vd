const { getSingleWord } = require('./model')

async function handler(req, res) {
  const word = await getSingleWord({ ...req.params, ...req.query })

  if (!word) return res.sendStatus(404)

  res.json(word)
}

module.exports = { handler }
