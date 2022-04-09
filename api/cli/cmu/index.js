const path = require('path')
const fs = require('fs')
const readline = require('readline')
const { toIPA } = require('arpabet-and-ipa-convertor-ts')
const knex = require('knex')

function parseLine(line) {
  const [str] = line.split(' #')
  const sep = str.indexOf(' ')
  const word = str.substring(0, sep).replace(/\(\d+\)/g, '')
  const ipa = toIPA(str.substring(sep + 1))

  return { word, ipa }
}

async function run() {
  const db = knex({
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../../db/pronunciation.db'),
    },
    useNullAsDefault: true,
  })

  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, 'cmudict/cmudict.dict')),
    crlfDelay: Infinity,
  })

  let entries = []
  let c = 0
  for await (const line of rl) {
    entries.push(parseLine(line))
    c++

    if (c % 100 === 0) {
      await db.batchInsert('pronunciations', entries)
      process.stdout.write('.')
      entries = []
    }
  }

  await db.batchInsert('pronunciations', entries)
  process.stdout.write('.')
  process.exit(0)
}

run()
