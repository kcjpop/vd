const { getSingleWord } = require('../getSingleWord')

describe('getSingleWord', () => {
  it('should return definitions of a word', async () => {
    const word = await getSingleWord({ word: 'dick' })

    expect(word.definitions.flatMap((d) => d.definitions)).toHaveLength(3)
  })

  it('should match definitions of a word', async () => {
    const word = await getSingleWord({ word: 'dick' })

    const meanings = word.definitions.flatMap((d) => d.definitions)

    expect(meanings[0].meaning).toBe(
      "to take one's dick that thề rằng, quả quyết rằng",
    )
    expect(meanings[1].meaning).toBe('up to dick xuất sắc, phi thường, cừ khôi')
    expect(meanings[2].meaning).toBe(
      '(từ Mỹ,nghĩa Mỹ),  (từ lóng) mật thám, thám tử',
    )
  })

  /* Pronunciations */
  it('should return pronunciations if any', async () => {
    const word = await getSingleWord({ word: 'dick' })

    expect(word.pronunciations).toContain('dɪk')
  })

  /* Tenses */
  it('should return tenses as null for noun', async () => {
    const word = await getSingleWord({ word: 'dick' })

    expect(word.tenses).toBe(null)
  })

  it('should return tenses for verb', async () => {
    const word = await getSingleWord({ word: 'organize' })

    expect(word.tenses.infinitive).toBe('organize')
    expect(word.tenses.singular_present_3rd).toBe('organizes')
    expect(word.tenses.present_participle).toBe('organizing')
    expect(word.tenses.past_plural).toBe('organized')
    expect(word.tenses.past_participle).toBe('organized')
  })

  it('should return null if word not found', async () => {
    const word = await getSingleWord({ word: 'sdfs' })

    expect(word).toBe(null)
  })

  /* -- Wordnet -- */
  it('should return definitions for a word from wordnet', async () => {
    const word = await getSingleWord({ word: 'dick', dict: 'wordnet' })

    const defs = word.definitions.flatMap((d) => d.definitions)

    expect(defs).toHaveLength(2)
    expect(defs[0].meaning).toBe('someone who is a detective')
    expect(defs[1].meaning).toBe('obscene terms for penis')
  })

  it('should return related words for a word from wordnet', async () => {
    const word = await getSingleWord({ word: 'dick', dict: 'wordnet' })
    const defs = word.definitions.flatMap((d) => d.definitions)

    expect(defs[0].relatedWords).toHaveLength(2)
    expect(defs[0].relatedWords[0]).toBe('gumshoe')
    expect(defs[0].relatedWords[1]).toBe('hawkshaw')

    expect(defs[1].relatedWords).toHaveLength(6)
    expect(defs[1].relatedWords).toContain('cock')
  })
})
