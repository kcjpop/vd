const v8n = require('v8n')

/* seems unnecessary since without `word`, path to handler will not work */
const validateGetBanner = (req, res, next) => {
  const { word } = req.params

  try {
    v8n().string().check(word)

    next()
  } catch ({ rule }) {
    res.status(400).json({ error: `${word} is not a valid string` })
  }
}

module.exports = { validateGetBanner }
