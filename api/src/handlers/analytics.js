const { updateBasicAnalytics } = require('../domain-logic/analytics')

const updateAnalyticsHandler = async (req, res) => {
  const ip = req.ip

  const { error } = await updateBasicAnalytics({ ip, ...req.query })

  if (error) {
    res.status(500).json({ error })
  } else {
    res.status(200).json({ success: true })
  }
}

module.exports = { updateAnalyticsHandler }
