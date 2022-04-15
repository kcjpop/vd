const { getPronunciations } = require('../../domain-logic/pronunciation')

describe('getPronunciations', () => {
  it('should return pronunciation for a word', async () => {
    const pronunciations = await getPronunciations('dick')

    expect(pronunciations).toContain('dɪk')
  })

  it('should return null for an un-found word', async () => {
    const pronunciations = await getPronunciations('sdfs')

    expect(pronunciations).toHaveLength(0)
  })
})
