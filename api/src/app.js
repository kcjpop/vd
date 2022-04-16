const express = require('express')
const cors = require('cors')
const app = express()

const { getSingleWordHandler } = require('./handlers/words')
const { getImageHandler } = require('./handlers/banner')
const { getSummaryHandler } = require('./handlers/summary')
const { getSuggestions } = require('./handlers/suggestions')

app.use(
  cors({
    origin: [/\.tudien\.io$/],
  }),
)

app.use(express.json())

// Disable X-Powered-By header
app.disable('x-powered-by')

app.get('/words/:word', getSingleWordHandler)

app.get('/banner/:word', getImageHandler)

app.get('/summary', getSummaryHandler)

app.get('/suggestions/:word', getSuggestions)

module.exports = app
