const { getEnViDb } = require('../db')

exports.getWordsOfDict = function getWordsOfDict({ dict, limit, offset }) {
  const db = getEnViDb()
  const sql = `select distinct word
from words
order by word asc
limit ? offset ?`

  const words = db.prepare(sql).all(limit, offset)

  const totalSql = `select count(distinct word) as counter
from words`
  const total = db.prepare(totalSql).get()

  return { words, offset, limit, total: total.counter }
}
