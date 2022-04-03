const path = require('path')
const fs = require('fs')
const readline = require('readline')

const { toIPA } = require('arpabet-and-ipa-convertor-ts')

function parseLine(line) {
  const [str] = line.split(' #')
  const sep = str.indexOf(' ')
  const word = str.substring(0, sep).replace(/\(\d+\)/g, '')
  const ipa = toIPA(str.substring(sep + 1))

  return { word, ipa }
}

async function run() {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, 'cmudict/cmudict.dict')),
    crlfDelay: Infinity,
  })

  // let c = 0
  for await (const line of rl) {
    const entry = parseLine(line)
    // c++
    // if (c === 1000) break
  }
}

run()
