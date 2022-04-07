const { getSingleWord } = require('../domain-logic/words')

async function getSingleWordHandler(req, res) {
  const word = await getSingleWord({ ...req.params, ...req.query })

  if (!word) return res.sendStatus(404)

  res.json(word)
}

module.exports = { getSingleWordHandler }
