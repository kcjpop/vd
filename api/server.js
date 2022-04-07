const express = require('express')
const cors = require('cors')
const app = express()

const { getSingleWordHandler } = require('./src/handlers/words')
const { getImageHandler } = require('./src/handlers/banner')
const { getDb } = require('./src/domain-logic/db')

const PORT = process.env.PORT ?? 8080

app.use(cors())
app.use(express.json())

app.get('/words/:word', getSingleWordHandler)

app.get('/banner/:word', getImageHandler)

app.get('/ping', (req, res) => {
  const db = getDb('analytics.db', { readonly: false })

  const stm = db.prepare(
    'insert into analytics (ts, ip, action, meta) values(?, ?, ?, ?);',
  )
  const inserted = stm.run([
    Math.floor(Date.now() / 1000),
    req.ip,
    'pageview',
    JSON.stringify({
      region: process.env.FLY_REGION,
      allocId: process.env.FLY_ALLOC_ID,
    }),
  ])

  const all = db.prepare('select * from analytics').all()
  res.json({ inserted, all })
})

app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on http://localhost:${PORT}`)
})
