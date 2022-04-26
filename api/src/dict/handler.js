const { getWordsOfDict } = require('./query')

async function getWordsOfDictHandler(req, res) {
  try {
    const words = getWordsOfDict({ ...req.params, ...req.query })

    res.json(words)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getWordsOfDictHandler }
