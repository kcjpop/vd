import { words as db } from 'lib/db'

export default function (req, res) {
  const { word: kw } = req.query

  const matched = db[kw] || db[kw.replaceAll('-', ' ')]

  if (!!matched) {
    const [first, ...rest] = matched.split('<br>')
    let word, ipa, _, ipaVariations

    if (/^@(.*?)(\/.*?\/)(\s+\.*\\s+\/.*\/)?/gms.test(first))
      [[_, word, ipa, ipaVariations]] = [
        ...first.matchAll(/^@(.*?)(\/.*?\/)(\s+\(.*\)\s+\/.*\/)?/g),
      ]
    else [[_, word]] = [...first.matchAll(/^@(.*?)/gms)]

    let marker
    let definitions = [],
      index = -1
    rest.forEach((element) => {
      marker = marker || element[0]

      if (element[0] === marker) {
        definitions.push({})
        ++index
      }

      const value = element.substring(1).trim()
      switch (element[0]) {
        case '*': {
          definitions[index].partOfSpeech = value
          break
        }
        case '-': {
          definitions[index].meanings = definitions[index].meanings
            ? [...definitions[index].meanings, value]
            : [value]
          break
        }
        case '=': {
          const [text, translation] = value.split('+ ')
          definitions[index].examples = definitions[index].examples
            ? [...definitions[index].examples, { text, translation }]
            : [{ text, translation }]

          break
        }
        case '+':
        default: {
          break
        }
      }
    })

    const payload = { word, ipa, definitions }

    res.status(200).json(payload)
  } else {
    res.status(500).json({ message: `${word} not found` })
  }
}
