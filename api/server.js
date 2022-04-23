require('dotenv-flow').config()

const app = require('./src/app')
const PORT = process.env.PORT ?? 8080

app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on http://localhost:${PORT}`)
})
