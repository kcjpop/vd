const { getDictSummaries } = require('../domain-logic/getDictSummaries')

async function handler(req, res) {
  const summary = await getDictSummaries()

  res.json(summary)
}

module.exports = { handler }
