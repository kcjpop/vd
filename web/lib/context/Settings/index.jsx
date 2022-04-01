import { createContext, useState, useEffect } from 'react'
import { getExampleSpeechSettings } from '../../storage'

export const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [state, setState] = useState({
    showExampleSpeech: false,
  })

  const toggleShowExampleSpeech = (value) => {
    getExampleSpeechSettings().set(value)
    setState({ ...setState, showExampleSpeech: value })
  }

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      showExampleSpeech: getExampleSpeechSettings().get(),
    }))
  }, [])

  return (
    <SettingsContext.Provider value={{ state, toggleShowExampleSpeech }}>
      {children}
    </SettingsContext.Provider>
  )
}
