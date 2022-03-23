import { Volumn } from '../common/Icons'

const LANG = 'en-GB'

export function Speech({ word }) {
  const doSpeak = () => {
    const synth = window.speechSynthesis
    const voice = synth.getVoices().find((voice) => voice.lang === LANG)

    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = LANG
    utterance.voice = voice
    synth.speak(utterance)
  }

  return <Volumn size="24px" className="cursor-pointer" onClick={doSpeak} />
}
