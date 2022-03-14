import { words as db } from 'lib/db'

export const parser = (kw) => {
  const matched = db[kw] || db[kw.replaceAll('-', ' ')]

  if (matched !== undefined || matched !== null) {
    const [first, ...rest] = matched.split('<br>')
    let word, ipa, ipaVariations

    if (/^@(.*?)(\/.*?\/)(\s+\.*\\s+\/.*\/)?/gms.test(first)) {
      let parsed = [...first.matchAll(/^@(.*?)(\/.*?\/)(\s+\(.*\)\s+\/.*\/)?/g)]
      word = parsed[1]
      ipa = parsed[2]
      ipaVariations = parsed[3] || null
    } else {
      let parsed = [...first.matchAll(/^@(.*?)/gms)]
      word = parsed[1]
    }

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

    return { word, ipa, definitions, ipaVariations }
  }

  return null
}
