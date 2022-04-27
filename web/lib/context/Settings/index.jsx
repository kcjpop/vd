import { createContext, useState, useEffect } from 'react'
import { getExampleSpeechSettings } from '../../storage'

export const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [showSpeechForExamples, setShowSpeechForExamples] = useState(false)

  const toggleShowExampleSpeech = (value) => {
    getExampleSpeechSettings().set(value)
    setShowSpeechForExamples(value)
  }

  useEffect(() => {
    setShowSpeechForExamples(getExampleSpeechSettings().get())
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        settings: { showSpeechForExamples },
        toggleShowExampleSpeech,
      }}>
      {children}
    </SettingsContext.Provider>
  )
}
