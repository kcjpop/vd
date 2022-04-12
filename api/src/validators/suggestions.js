const v8n = require('v8n')

const validateGetSuggestions = (req, res, next) => {
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

module.exports = { validateGetSuggestions }
