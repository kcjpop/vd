import { createContext, useState, useEffect } from 'react'
import { getExampleSpeechSettings, getHideFlashcardTip } from '../../storage'

export const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [showSpeechForExamples, setShowSpeechForExamples] = useState(false)
  const [hideFlashcardTip, setHideFlashcardTip] = useState(false)

  const toggleShowExampleSpeech = (value) => {
    getExampleSpeechSettings().set(value)
    setShowSpeechForExamples(value)
  }

  const toggleHideFlashcardTip = (value) => {
    getHideFlashcardTip().set(value)
    setHideFlashcardTip(value)
  }

  useEffect(() => {
    setShowSpeechForExamples(getExampleSpeechSettings().get())
    setHideFlashcardTip(getHideFlashcardTip().get())
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        settings: { showSpeechForExamples, hideFlashcardTip },
        toggleShowExampleSpeech,
        toggleHideFlashcardTip,
      }}>
      {children}
    </SettingsContext.Provider>
  )
}
