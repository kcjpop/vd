const express = require('express')
const cors = require('cors')
const app = express()

const getSingleWord = require('./words/getSingleWord')

const getSuggestions = require('./suggestions/getSuggestions')
const getSummary = require('./summary/getSummary')
const getWordsOfDict = require('./dict/getWordsOfDict')
const getBanner = require('./banner/getBanner')

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

app.get('/words/:word', getSingleWord.handler)

app.get('/dict/:name', getWordsOfDict.validator, getWordsOfDict.handler)

app.get('/banner/:word', getBanner.handler)

app.get('/summary', getSummary.handler)

app.get('/suggestions/:word', getSuggestions.validator, getSuggestions.handler)

module.exports = app
