import React from 'react'
import { getVoiceSettings } from '../../storage'
import { VolumnIcon } from '../common/Icons'

const LANG = 'en'

export function Speech({ word }) {
  const [voices, setVoices] = React.useState(null)

  React.useEffect(() => {
    const doGetVoices = () => {
      if (!window.speechSynthesis) return

      const voices = window.speechSynthesis.getVoices()

      if (voices.length > 0) {
        setVoices(voices.filter(({ lang }) => lang.startsWith(LANG)))
      }
    }

    doGetVoices()

    // Cannot use `addEventListener` on iOS Safari T_T
    window.speechSynthesis.voiceschanged = doGetVoices

    return () => {
      window.speechSynthesis.voiceschanged = undefined
    }
  }, [])

  const doSpeak = () => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(word)
    const selected = getVoiceSettings().get()
    const voice = voices.find(({ lang, voiceURI }) =>
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
