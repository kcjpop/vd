const { getImage } = require('../domain-logic/banner')

async function getImageHandler(req, res) {
  try {
    const image = await getImage({ ...req.params, ...req.query })

    res.setHeader('Content-Type', 'image/png')
    res.send(image)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getImageHandler }
