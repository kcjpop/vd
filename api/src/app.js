const express = require('express')
const cors = require('cors')
const app = express()

const { getSingleWordHandler } = require('./handlers/words')
const { getImageHandler } = require('./handlers/banner')
const { getSummaryHandler } = require('./handlers/summary')
const { getSuggestions } = require('./handlers/suggestions')

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'local') {
  app.use(
    cors({
      origin: [/localhost/i],
    }),
  )
} else {
  app.use(
    cors({
      origin: [/\.tudien\.io$/i, /.*-kcjpop\.vercel\.app$/i],
    }),
  )
}

app.use(express.json())

app.disable('x-powered-by')

app.get('/words/:word', getSingleWordHandler)

app.get('/banner/:word', getImageHandler)

app.get('/summary', getSummaryHandler)

app.get('/suggestions/:word', getSuggestions)

module.exports = app
