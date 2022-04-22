import { rdr } from '@/lib/test-utils'

import { Speech } from '../Speech'

const mocked = {
  getVoices() {
    return [
      {
        default: false,
        lang: 'en-US',
        localService: true,
        name: 'Alex',
        voiceURI: 'urn:moz-tts:osx:com.apple.speech.synthesis.voice.Alex',
      },
      {
        default: false,
        lang: 'it-IT',
        localService: true,
        name: 'Alice',
        voiceURI: 'urn:moz-tts:osx:com.apple.speech.synthesis.voice.alice',
      },
    ]
  },
}

describe('Speech', () => {
  afterEach(() => {
    window.speechSynthesis = {}
    jest.restoreAllMocks()
  })

  it('should not render anything if the current device does not support SpeechSynthesis', () => {
    const { container } = rdr(<Speech word="hello" />)

    expect(container.querySelector('svg')).toBeNull()
  })

  it('should render a speech icon if SpeechSynthesis is available', () => {
    window.speechSynthesis = mocked

    const { container } = rdr(<Speech word="hello" />)

    expect(container.querySelector('svg')).toBeDefined()
  })

  it('should allow to change size of the icon', () => {
    window.speechSynthesis = mocked

    const { container } = rdr(<Speech word="hello" size="48px" />)
    const icon = container.querySelector('svg')

    expect(icon.getAttribute('width')).toBe('48px')
    expect(icon.getAttribute('height')).toBe('48px')
  })
})
