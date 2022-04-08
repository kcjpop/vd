const getSummary = async (req, res) => {
  const summary = await getSummary()

  res.json(summary)
}

module.exports = { getSummary }
