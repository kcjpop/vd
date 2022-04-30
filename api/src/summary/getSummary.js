const { getDictSummaries } = require('../domain-logic/getDictSummaries')

async function handler(req, res) {
  try {
    const summary = await getDictSummaries()

    res.json(summary)
  } catch (e) {
    res.sendStatus(500)
  }
}

module.exports = { handler }
