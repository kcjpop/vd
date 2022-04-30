const express = require('express')
const cors = require('cors')
const app = express()

const { getSingleWordHandler } = require('./handlers/words')
const { getSummaryHandler } = require('./handlers/summary')
const { getSuggestions } = require('./handlers/suggestions')

const getWordsOfDict = require('./dict/getWordsOfDict')

const getBanner = require('./banner/getBanner')

const { validateGetSuggestions } = require('./validators/suggestions')

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'local') {
  app.use(
    cors({
      origin: [/localhost/i],
    }),
  )
} else {
  app.use(
    cors({
      origin: [/tudien\.io$/i, /.*-kcjpop\.vercel\.app$/i],
    }),
  )
}

app.use(express.json())

app.disable('x-powered-by')

app.get('/words/:word', getSingleWordHandler)

app.get('/dict/:name', getWordsOfDict.validator, getWordsOfDict.handler)

app.get('/banner/:word', getBanner.handler)

app.get('/summary', getSummaryHandler)

app.get('/suggestions/:word', validateGetSuggestions, getSuggestions)

module.exports = app
