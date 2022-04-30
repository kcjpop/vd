const v8n = require('v8n')

const { getSuggestions } = require('../domain-logic/getSuggestions')

const validator = (req, res, next) => {
  const { limit } = req.query

  if (!v8n().undefined().test(limit)) {
    try {
      v8n().numeric().between(-1, 50).check(Number(limit))
    } catch (exception) {
      res.status(400).json({
        error: `limit is not ${
          exception.rule.name === 'numeric' ? 'a number' : 'between -1 and 50.'
        }`,
      })
      return
    }
  }

  next()
}

const handler = async (req, res) => {
  const suggestions = await getSuggestions({
    ...req.params,
    ...req.query,
  })

  res.json(suggestions?.map((w) => w.word) ?? [])
}

module.exports = { handler, validator }
