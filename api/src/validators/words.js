const v8n = require('v8n')

const validateDict = v8n().passesAnyOf(
  v8n().undefined(),
  v8n().exact('wordnet'),
  v8n().equal(''),
)

const isString = v8n().string()

const validateGetSingleWord = (req, res, next) => {
  const { word } = req.params
  const { dict } = req.query

  try {
    isString.check(word)
    validateDict.check(dict)

    next()
  } catch ({ rule }) {
    let message = ''

    switch (rule.name) {
      case 'string': {
        message = `${word} is not a valid string`
        break
      }
      default: {
        message = `dict='${dict}' is not valid, either remove it or set it with 'wordnet'`
        break
      }
    }

    res.status(400).json({ error: message })
  }
}

module.exports = { validateGetSingleWord }
