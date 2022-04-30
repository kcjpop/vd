const { getSummary } = require('./model')

async function handler(req, res) {
  const summary = await getSummary()

  res.json(summary)
}

module.exports = { handler }
