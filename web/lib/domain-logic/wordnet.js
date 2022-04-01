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
      s.tagcount,
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
    group_concat(distinct lemma) as related_words,
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
    synsetid
  order by
    tagcount desc`
  const rows = db.prepare(sql).all(word)

  if (rows) {
    const mapped = rows.map((row) => ({
      id: row.synsetid,
      partOfSpeech: translatePos(row.pos),
      relatedWords: row.related_words?.split(',').filter((w) => w !== word),
      examples: unique(row.examples?.split('|'))?.map((text) => ({ text })),
      meaning: row.definition,
    }))

    const compress = (group) =>
      group.reduce((acc, { partOfSpeech, ...def }) => {
        acc.partOfSpeech = partOfSpeech

        if (!acc.definitions) acc.definitions = []
        acc.definitions.push(def)

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
