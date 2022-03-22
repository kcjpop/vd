const Rgx = {
  firstline: /(?<=@).*?(?=<br>)/g,
  definitions: /(?<=<br>)-.*?((?=<br>!)|(?=$))/,
  definitionGroup: /(?<=<br>)\*.*?((?=<br>\*)|(?=$))+/g,
  partOfSpeech: /\*.*?(?=<br>)/g,
  idioms: /(?<=<br>)!.*?((?=<br>!)|(?=$))/g,
  fl: {
    word: /(?<=@).*?(?=\/)/,
    ipas: /(?<=\/)[^\s]+?(?=\/)/g,
    alternatives: /(?<=\().*?(?=\))/g,
  },
}

const parseFirstLine = function (line) {
  const [ipa, ...altIpas] = [...line.matchAll(Rgx.fl.ipas)].map(([v]) => v)
  const alts = [...line.matchAll(Rgx.fl.alternatives)].map(([v]) => v)

  const alternatives = alts.map((word, index) => ({
    word,
    ipa: altIpas[index] || null,
  }))

  return {
    word: line.match(Rgx.fl.word)[0].trim(),
    ipa,
    alternatives,
  }
}

const parseText = function (string) {
  return string.substring(1).trim()
}

const parseExample = function (string) {
  const [text, translation] = string
    .substring(1)
    .split('+')
    .map((str) => str.trim())

  return { text, translation }
}

const parseDefinition = function (defs) {
  return defs.split('<br>').reduce((acc, line) => {
    if (line.startsWith('-')) {
      acc.meaning = parseText(line)
    } else if (line.startsWith('=')) {
      acc.examples = [...(acc.examples || []), parseExample(line)]
    }

    return acc
  }, {})
}

const parseIdiom = function (idiom) {
  let definitionIndex = -1
  return idiom.split('<br>').reduce(
    (acc, line) => {
      if (line.startsWith('!')) {
        acc.text.push(parseText(line))
      } else if (line.startsWith('-')) {
        definitionIndex += 1

        acc.definitions.push({ meaning: parseText(line) })
      } else if (line.startsWith('=')) {
        acc.definitions[definitionIndex].examples = [
          ...(acc.definitions[definitionIndex].examples || []),
          parseExample(line),
        ]
      }

      return acc
    },
    { text: [], definitions: [] },
  )
}

export function parse(entry) {
  const [firstline] = entry.split('<br>')

  return {
    ...parseFirstLine(firstline),
    definitions: [...entry.matchAll(Rgx.definitionGroup)].map(([group]) => {
      const [partOfSpeech] = group
        .match(Rgx.partOfSpeech)
        .map((line) => parseText(line))

      const definitions = [...group.match(Rgx.definitions)].map((line) =>
        parseDefinition(line),
      )
      const idioms = [...group.matchAll(Rgx.idioms)].map(([idiom]) =>
        parseIdiom(idiom),
      )

      return {
        partOfSpeech,
        definitions,
        idioms,
      }
    }),
  }
}
