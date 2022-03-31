import React from 'react'
import { getVoiceSettings } from '../../storage'
import { VolumnIcon } from '../common/Icons'

const LANG = 'en'

export function Speech({ word }) {
  const [voices, setVoices] = React.useState(null)

  React.useEffect(() => {
    doGetVoices()

    window.speechSynthesis.addEventListener('voiceschanged', doGetVoices)
  }, [])

  const doGetVoices = () => {
    const synth = window.speechSynthesis
    const voices = synth.getVoices()

    if (voices.length > 0) {
      setVoices(voices.filter(({ lang }) => lang.startsWith(LANG)))
    }
  }

  const doSpeak = () => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(word)
    const selected = getVoiceSettings().get()
    let voice = voices.find(({ lang, voiceURI }) =>
      selected ? selected === voiceURI : lang.startsWith(LANG),
    )

    if (voice) {
      utterance.lang = voice.lang
      utterance.voice = voice
      synth.speak(utterance)
    }
  }

  return !voices ? null : (
    <VolumnIcon size="24px" className="cursor-pointer" onClick={doSpeak} />
  )
}
