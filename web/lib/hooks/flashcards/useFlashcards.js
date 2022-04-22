import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getFlashcards, upsertFlashcards, deleteFlashcards } from './query'

export function useFlashcards({ user, setId }) {
  const qc = useQueryClient()
  const queryKey = ['flashcards', user?.id]

  const {
    data: flashcards,
    isLoading,
    isError,
  } = useQuery(['flashcards', user?.id], async () => {
    if (!user) return

    const { data: flashcards, error } = await getFlashcards({ setId })

    if (error) throw error
    return flashcards
  })

  const modifyFlashcard = useMutation(
    async (flashcard) => {
      const { data, error } = await upsertFlashcards(flashcard)

      if (error) throw error

      return data[0]
    },
    {
      mutationKey: 'upsert-flashcard',
      onSuccess: () => qc.invalidateQueries(queryKey),
    },
  )

  const removeFlashcard = useMutation(
    async (id) => {
      const { error } = await deleteFlashcards({ id })

      if (error) throw error
    },
    {
      mutationKey: 'upsert-flashcard',
      onSuccess: () => qc.invalidateQueries(queryKey),
    },
  )

  return {
    flashcards,
    isLoading,
    isError,
    modifyFlashcard,
    removeFlashcard,
  }
}
