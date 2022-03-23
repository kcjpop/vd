import { useState } from 'react'
import { getVoiceSettings } from '../storage'

export function Settings() {
  const voices = globalThis.window
    ? window.speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang.startsWith('en'))
    : []

  const voiceSettings = getVoiceSettings()
  const [selected, setSelected] = useState(
    voiceSettings.get() ?? voices?.[0]?.voiceURI,
  )

  const doSetVoice = (e) => {
    voiceSettings.set(e.target.value)
    setSelected(e.target.value)
  }

  return (
    <div className="grid grid-cols-2 items-center">
      <p className="font-bold">Giọng đọc</p>
      <select
        className="rounded border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
        value={selected}
        onChange={doSetVoice}>
        {voices.map((voice) => (
          <option value={voice.voiceURI} key={voice.voiceURI}>
            {voice.name} - {voice.lang}
          </option>
        ))}
      </select>
    </div>
  )
}
