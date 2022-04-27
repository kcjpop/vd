const { getDb } = require('../domain-logic/db')

const EN_VI_DB = 'en-vi.db'
const db = getDb(EN_VI_DB)

exports.getWordsOfDict = function getWordsOfDict({ dict, limit, offset }) {
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
