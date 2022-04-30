const { getSuggestions } = require('../getSuggestions')

describe('getSuggestions', () => {
  it('should get array of suggestions of an input', async () => {
    const suggestions = await getSuggestions({ word: 'sugg' })
    const words = suggestions.map((s) => s.word)

    expect(suggestions).toHaveLength(8)
    expect(words).toContain('suggest')
    expect(words).toContain('suggester')
  })

  it('should get default only 10 suggestions of an input', async () => {
    const suggestions = await getSuggestions({ word: 'sug' })

    expect(suggestions).toHaveLength(10)
  })

  it('should get a finite number of suggestions of an input', async () => {
    const suggestions = await getSuggestions({ word: 'sug', limit: 20 })

    expect(suggestions).toHaveLength(20)
  })

  it('should only get maximum 50 suggestions of an input', async () => {
    const suggestions = await getSuggestions({ word: 's', limit: 51 })

    expect(suggestions).toHaveLength(50)
  })
})
