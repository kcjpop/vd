const v8n = require('v8n')

const { getWordsOfDict } = require('./query')

const MIN_LIMIT = 100
const MAX_LIMIT = 1000

async function handler(req, res) {
  try {
    const offset = Number(req.query.offset)
    const limit = Number(req.query.limit)

    const result = getWordsOfDict({
      offset: !Number.isNaN(offset) ? offset : 0,
      limit: !Number.isNaN(limit) ? limit : MIN_LIMIT,
    })

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const validator = (req, res, next) => {
  try {
    v8n()
      .schema({
        limit: v8n().between(MIN_LIMIT, MAX_LIMIT),
        offset: v8n().numeric(),
      })
      .check(req.query)
  } catch (e) {
    // Lazy-ass validation error. Should have better error messages 😥
    res.status(400).json({ errors: e.rule })
    return
  }

  next()
}

module.exports = { handler, validator }
