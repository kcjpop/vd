import { useQuery } from 'react-query'
import { getFlashcardSet } from './query'

export function useSingleSet({ user, setId }) {
  const {
    data: currentSet,
    isLoading,
    isError,
  } = useQuery(['flashcard-set', user?.id, setId], async () => {
    if (!setId || !user) return

    const { data, error } = await getFlashcardSet({
      id: setId,
      userId: user.id,
    })

    if (error) throw error

    return data
  })

  return { currentSet, isLoading, isError }
}
