import { createContext, useState } from 'react'
import { getExampleSpeechSettings } from '../../storage'

export const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [showSpeechForExamples, setShowSpeechForExamples] = useState(
    getExampleSpeechSettings().get(),
  )

  const toggleShowExampleSpeech = (value) => {
    getExampleSpeechSettings().set(value)
    setShowSpeechForExamples(value)
  }

  return (
    <SettingsContext.Provider
      value={{ settings: { showSpeechForExamples }, toggleShowExampleSpeech }}>
      {children}
    </SettingsContext.Provider>
  )
}
