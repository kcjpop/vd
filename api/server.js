const express = require('express')
const app = express()

const words = require('./src/words')

const PORT = process.env.PORT ?? 8080

app.use(express.json())

app.get('/words/:word', async (req, res) => {
  const word = await words.getSingleWords(req.params)
  res.send(word)
})

app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', PORT)
})
