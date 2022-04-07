const express = require('express')
const app = express()

const words = require('./src/words')
const banner = require('./src/banner/banner')

const PORT = process.env.PORT ?? 8080

app.use(express.json())

app.get('/words/:word', async (req, res) => {
  const word = await words.getSingleWords(req.params)
  res.send(word)
})

app.get('/banner/:word', async (req, res) => {
  const image = await banner.getImage(req.params)

  res.setHeader('Content-Type', 'image/png')
  res.send(image)
})

app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', PORT)
})
