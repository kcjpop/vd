const { getAllTenses } = require('../../domain-logic/verb-tenses')

describe('getAllTenses', () => {
  it('should get tenses for a verb', async () => {
    const tenses = await getAllTenses('organize')

    expect(tenses.infinitive).toBe('organize')
    expect(tenses.singular_present_3rd).toBe('organizes')
    expect(tenses.present_participle).toBe('organizing')
    expect(tenses.past_plural).toBe('organized')
    expect(tenses.past_participle).toBe('organized')
  })

  it('should return undefined for a word not a verb', async () => {
    const tenses = await getAllTenses('playground')

    expect(tenses).toBe(undefined)
  })
})
