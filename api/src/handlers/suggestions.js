const { getSuggestions: querySuggestions } = require('../domain-logic/en-vi')

const getSuggestions = async (req, res) => {
  const suggestions = await querySuggestions({ ...req.params, ...req.query })

  res.json(suggestions?.map((w) => w.word) ?? [])
}

module.exports = { getSuggestions }
