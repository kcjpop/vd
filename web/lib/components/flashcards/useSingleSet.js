import { useQuery } from 'react-query'
import { getFlashcardSet } from './query'

export function useSingleSet(
  { user, setId },
  { fields } = { fields: 'id, user_id, flashcards(*)' },
) {
  const {
    data: currentSet,
    isLoading,
    isError,
  } = useQuery(['flashcard-set', user?.id, setId], async () => {
    if (!setId || !user) return

    const { data } = await getFlashcardSet(
      {
        id: setId,
        userId: user.id,
      },
      { fields },
    )

    return data
  })

  return { currentSet, isLoading, isError }
}
