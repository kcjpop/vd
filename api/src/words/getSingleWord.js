const { getSingleWord } = require('../domain-logic/getSingleWord')

async function handler(req, res) {
  try {
    const word = await getSingleWord({ ...req.params, ...req.query })

    if (!word) return res.sendStatus(404)

    res.json(word)
  } catch (e) {
    if (e instanceof TypeError) res.sendStatus(400)
    else res.sendStatus(500)
  }
}

module.exports = { handler }
