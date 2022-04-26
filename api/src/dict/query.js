const { getDb } = require('../domain-logic/db')

const EN_VI_DB = 'en-vi.db'
const db = getDb(EN_VI_DB)

const MAX_LIMIT = 1000

exports.getWordsOfDict = function getWordsOfDict({
  dict,
  limit: _limit = MAX_LIMIT,
  offset = 0,
}) {
  const limit = Math.min(MAX_LIMIT, _limit)

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
