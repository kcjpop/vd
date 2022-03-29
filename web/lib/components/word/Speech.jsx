import React from 'react'
import { getVoiceSettings } from '../../storage'
import { VolumnIcon } from '../common/Icons'

const LANG = 'en-GB'

function getVoices() {
  return new Promise((resolve) => {
    let interval

    interval = setInterval(() => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        clearInterval(interval)
        resolve(voices)
      }
    }, 10)
  })
}

export function Speech({ word }) {
  const [voice, setVoice] = React.useState(null)

  React.useEffect(() => {
    doGetVoices()
  }, [])

  const doGetVoices = React.useCallback(() => {
    ;(async function () {
      const voices = await getVoices()
      const selectedVoice = getVoiceSettings().get()

      const voice = voices.find((voice) =>
        selectedVoice ? voice.voiceURI === selectedVoice : voice.lang === LANG,
      )

      if (voice) {
        setVoice(voice)
      }
    })()
  }, [])

  const doSpeak = () => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = voice.lang
    utterance.voice = voice
    synth.speak(utterance)
  }

  return voice ? (
    <VolumnIcon size="24px" className="cursor-pointer" onClick={doSpeak} />
  ) : null
}
