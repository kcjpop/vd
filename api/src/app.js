const express = require('express')
const cors = require('cors')
const app = express()

const { getSingleWordHandler } = require('./handlers/words')
const { getSuggestions } = require('./handlers/suggestions')

const getSummary = require('./summary/getSummary')

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

app.get('/summary', getSummary.handler)

app.get('/suggestions/:word', validateGetSuggestions, getSuggestions)

module.exports = app
