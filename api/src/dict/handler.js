const { getWordsOfDict } = require('./query')

async function getWordsOfDictHandler(req, res) {
  try {
    const offset = Number(req.query.offset)
    const limit = Number(req.query.limit)

    const result = getWordsOfDict({
      offset: !Number.isNaN(offset) ? offset : 0,
      limit: !Number.isNaN(limit) ? limit : 100,
    })

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getWordsOfDictHandler }
