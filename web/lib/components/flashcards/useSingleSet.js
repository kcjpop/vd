import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getFlashcardSet, upsertFlashcard, deleteFlashcards } from './query'

export function useSingleSet(
  { user, setId },
  { fields } = { fields: 'id, user_id, flashcards(*)' },
) {
  const queryKey = ['flashcard-set', user?.id, setId]
  const queryClient = useQueryClient()

  const {
    data: currentSet,
    isLoading,
    isError,
  } = useQuery(queryKey, async () => {
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

  // @todo: Add user_id as parameter
  const createNewFlashcard = useMutation(
    async ({ word, definition, setId }) => {
      const { error } = await upsertFlashcard({ word, definition })

      if (error) throw error
    },
    {
      mutationKey: ['create-flashcard', setId],
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
  )

  const updateFlashcard = useMutation(
    async ({ id, word, definition, setId }) => {
      const { error } = await upsertFlashcard({ id, word, definition, setId })

      if (error) throw error
    },
    {
      mutationKey: ['update-flashcard', setId],
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
  )

  const deleteFlashcard = useMutation(
    async ({ id }) => {
      const { error } = await deleteFlashcards({ id })

      if (error) throw error
    },
    {
      mutationKey: ['delete-flashcard', setId],
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
  )

  return {
    currentSet,
    isLoading,
    isError,
    createNewFlashcard,
    updateFlashcard,
    deleteFlashcard,
  }
}
