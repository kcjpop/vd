import { useQuery } from 'react-query'
import { useUser } from '../../domain-logic/auth'
import { getFlashcardSet } from './query'

export function useFlashcardSet({ setId }) {
  const { user } = useUser({ redirectIfUnauthenticated: false })

  const {
    data: currentSet,
    isLoading,
    isError,
  } = useQuery(['flashcard-set', setId], async () => {
    if (!setId) return

    const { data, error } = await getFlashcardSet({
      id: setId,
      userId: user.id,
    })

    if (error) throw error
    return data
  })

  return { currentSet, isLoading, isError }
}
