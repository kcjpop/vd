import { getDb } from './db'

const DB = 'wordnet.db'

// @see https://wordnet.princeton.edu/documentation/wndb5wn
const translatePos = (pos) => {
  const map = {
    a: 'adjective',
    n: 'noun',
    r: 'adverb',
    s: 'adjective satellite',
    v: 'verb',
  }
  return map[pos]
}

const groupBy = (col, keyFn) =>
  col.reduce((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)

    return acc
  }, {})

const unique = (col) => (col ? [...new Set(col)] : col)

export async function getSingleWord(word) {
  const db = await getDb(DB)
  const sql = `
  with t as (
    select
      s.wordid,
      ss.*
    from
      words w
      left join senses sn using (wordid)
      left join synsets ss using (synsetid)
      left join senses s on s.synsetid = ss.synsetid
    where
      w.lemma = ?
  )
  select
    lemma,
    group_concat(distinct lemma) as synonyms,
    -- Would be nice if we can group_concat(distinct sample, '|') but sqlite
    -- doesn't support that. Maybe we can refactor this query somehow.
    group_concat(sample, '|') as examples,
    pos,
    synsetid,
    definition
  from
    t
    left join samples sp using(synsetid)
    left join words w using(wordid)
  group by
    synsetid`
  const rows = await db.all(sql, [word])

  if (rows) {
    const mapped = rows.map((row) => ({
      partOfSpeech: translatePos(row.pos),
      synonymps: row.synonyms?.split(',').filter((w) => w !== word),
      examples: unique(row.examples?.split('|'))?.map((text) => ({ text })),
      meaning: row.definition,
    }))

    const compress = (group) =>
      group.reduce((acc, { partOfSpeech, meaning, synonymps, examples }) => {
        acc.partOfSpeech = partOfSpeech

        if (!acc.definitions) acc.definitions = []
        acc.definitions.push({ meaning, synonymps, examples })

        return acc
      }, {})

    const defs = groupBy(mapped, (i) => i.partOfSpeech)

    const result = {
      word,
      definitions: Object.values(defs).map((group) => compress(group)),
    }

    return result
  }
}
