const { getImage } = require('../domain-logic/banner')

async function getImageHandler(req, res) {
  const image = await getImage({ ...req.params, ...req.query })

  res.setHeader('Content-Type', 'image/png')
  res.send(image)
}

module.exports = { getImageHandler }
