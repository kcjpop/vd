const express = require('express')
const cors = require('cors')
const app = express()

const { getSingleWordHandler } = require('./src/handlers/words')
const { getImageHandler } = require('./src/handlers/banner')
const { getSummaryHandler } = require('./src/handlers/summary')

const PORT = process.env.PORT ?? 8080

app.use(
  cors({
    origin: [/\.tudien\.io$/],
  }),
)
app.use(express.json())

app.get('/words/:word', getSingleWordHandler)

app.get('/banner/:word', getImageHandler)

app.get('/summary', getSummaryHandler)

app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on http://localhost:${PORT}`)
})
