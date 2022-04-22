import { useState, useEffect } from 'react'
import { useUser } from '../../domain-logic/auth'
import { getFlashcardSet } from './query'

export function useFlashcardSet({ setId }) {
  const [currentSet, setCurrentSet] = useState(null)
  const { user } = useUser({ redirectIfUnauthenticated: false })

  useEffect(() => {
    const getCurrentSet = async () => {
      const { data, error } = await getFlashcardSet({
        id: setId,
        userId: user.id,
      })

      if (error) throw error
      setCurrentSet(data)
    }

    user && getCurrentSet()
  }, [user, setId])

  return { currentSet }
}
