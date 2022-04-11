const express = require('express')
const cors = require('cors')
const app = express()

const { getSingleWordHandler } = require('./src/handlers/words')
const { getImageHandler } = require('./src/handlers/banner')
const { getSummaryHandler } = require('./src/handlers/summary')
const { getSuggestions } = require('./src/handlers/suggestions')

const { validateGetSuggestions } = require('./src/validators/suggestions')
const { validateGetBanner } = require('./src/validators/banner')
const { validateGetSingleWord } = require('./src/validators/words')

const PORT = process.env.PORT ?? 8080

app.use(
  cors({
    origin: [/\.tudien\.io$/],
  }),
)

app.use(express.json())

// Disable X-Powered-By header
app.disable('x-powered-by')

app.get('/words/:word', validateGetSingleWord, getSingleWordHandler)

app.get('/banner/:word', validateGetBanner, getImageHandler)

app.get('/summary', getSummaryHandler)

app.get('/suggestions/:word', validateGetSuggestions, getSuggestions)

app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on http://localhost:${PORT}`)
})
