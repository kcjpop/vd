import { useQuery } from 'react-query'
import { getFlashcardSet } from './query'

export function useSingleSet({ user, setId }) {
  const {
    data: currentSet,
    isLoading,
    isError,
  } = useQuery(['flashcard-set', user?.id, setId], async () => {
    if (!setId || !user) return

    const { data } = await getFlashcardSet({
      id: setId,
      userId: user.id,
    })

    return data
  })

  return { currentSet, isLoading, isError }
}
