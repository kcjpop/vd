import { getVoiceSettings } from '../../storage'
import { VolumnIcon } from '../common/Icons'

const LANG = 'en-GB'

export function Speech({ word }) {
  const doSpeak = () => {
    const selectedVoice = getVoiceSettings().get()

    const synth = window.speechSynthesis
    const voice = synth
      .getVoices()
      .find((voice) =>
        selectedVoice ? voice.voiceURI === selectedVoice : voice.lang === LANG,
      )

    if (voice) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = voice.lang
      utterance.voice = voice
      synth.speak(utterance)
    }
  }

  return <VolumnIcon size="24px" className="cursor-pointer" onClick={doSpeak} />
}
