const { getPronunciations } = require('../pronunciation')

describe('getPronunciations', () => {
  it('should return pronunciation for a word', async () => {
    const pronunciations = await getPronunciations('duck')

    expect(pronunciations).toContain('dʌk')
  })

  it('should return null for an un-found word', async () => {
    const pronunciations = await getPronunciations('sdfs')

    expect(pronunciations).toHaveLength(0)
  })
})
