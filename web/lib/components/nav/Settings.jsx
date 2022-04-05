import { useState, useContext, Fragment } from 'react'

import { useTranslation } from '../../i18n'
import { getVoiceSettings } from '../../storage'

import { ToggleCheckbox } from '../toggle-checkbox/ToggleCheckbox'

import { SettingsContext } from '../../context/Settings'

export function Settings() {
  const { _e } = useTranslation()

  const voices = globalThis.window
    ? window.speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang.startsWith('en'))
    : []

  const voiceSettings = getVoiceSettings()
  const [selected, setSelected] = useState(
    voiceSettings.get() ?? voices?.[0]?.voiceURI,
  )

  const {
    settings: { showSpeechForExamples },
    toggleShowExampleSpeech,
  } = useContext(SettingsContext)

  const doSetVoice = (e) => {
    voiceSettings.set(e.target.value)
    setSelected(e.target.value)
  }

  return (
    <Fragment>
      <div className="grid items-center gap-2 lg:grid-cols-2">
        <div className="font-bold">{_e('nav.settings.voice')}</div>
        <select
          className="rounded border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
          value={selected}
          onChange={doSetVoice}>
          {voices.map((voice) => (
            <option value={voice.voiceURI} key={voice.voiceURI}>
              {voice.name} - {_e('nav.settings.voice.' + voice.lang)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid items-center gap-2 lg:grid-cols-2">
        <div className="font-bold">{_e('nav.settings.exampleSpeech')}</div>
        <div>
          <div className="float-right">
            <ToggleCheckbox
              checked={showSpeechForExamples}
              onChange={toggleShowExampleSpeech}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
