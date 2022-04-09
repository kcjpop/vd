const { getSummary } = require('../domain-logic/summary')

async function getSummaryHandler(req, res) {
  const summary = await getSummary()

  res.json(summary)
}

module.exports = { getSummaryHandler }
