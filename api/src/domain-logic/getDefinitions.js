const { getEnViDb, getWordnetDb } = require('../db')

const parseDefinitions = (id, raw) => {
  try {
    const defs = JSON.parse(raw)
    return defs.map((d, index) => ({ ...d, id: id + '-' + index }))
  } catch (e) {
    return null
  }
}

const parsePhrases = (raw) => {
  try {
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

async function getFromEnVi(word) {
  const db = getEnViDb()

  const sql = `
select defs.rowid as id, word, part_of_speech, definitions, phrases
from words
join defs using (word_id)
where word = ? or lower(word) = ?`

  const definitions = db.prepare(sql).all(word, word.toLocaleLowerCase())

  if (!definitions?.length) return

  return {
    // We'll use the word from database because keyword may be in different cases
    word: definitions?.[0].word ?? word,
    definitions: definitions.map((d) => ({
      partOfSpeech: d.part_of_speech,
      definitions: parseDefinitions(d.id, d.definitions),
      idioms: parsePhrases(d.phrases),
    })),
  }
}

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

async function getFromWordnet(word) {
  const db = getWordnetDb()

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
      w.lemma = ? or lower(w.lemma) = ?
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
  const rows = db.prepare(sql).all(word, word.toLocaleLowerCase())

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
      // We'll use the word from database because keyword may be in different cases
      word: rows?.[0].lemma ?? word,
      definitions: Object.values(defs).map((group) => compress(group)),
    }

    return result
  }
}

/**
 * Get word from db
 * @param {string} word
 */
async function getDefinitions(dict, word) {
  if (dict === 'en-vi') return getFromEnVi(word)
  if (dict === 'wordnet') return getFromWordnet(word)

  throw new TypeError('Unknow dictionary: ' + dict)
}

module.exports = { getDefinitions }
