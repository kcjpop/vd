import { useQuery, useMutation, useQueryClient } from 'react-query'

import {
  getAllSets,
  upsertSet,
  upsertFlashcard,
  deleteFlashcardSet,
} from './query'

export function useAllSets({
  user,
  fetchAllSets = false,
  fields = 'id, name, flashcards(id)',
}) {
  const queryClient = useQueryClient()
  const queryKey = ['flashcard-sets', user?.id]

  const {
    data: flashcardSets,
    isError,
    isLoading,
  } = useQuery(
    queryKey,
    async () => {
      if (!user) return

      const { data: sets, error } = await getAllSets(
        { userId: user.id },
        { fields },
      )
      if (error) throw error

      return sets
    },
    { enabled: fetchAllSets },
  )

  const createNewSet = useMutation(
    async ({ name, userId }) => {
      const { data, error } = await upsertSet({ name, user_id: userId })

      if (error) throw error
      return data[0]
    },
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
  )

  const deleteSet = useMutation(
    async (id) => {
      const { error } = await deleteFlashcardSet({ id })

      if (error) throw error
    },
    {
      mutationKey: 'delete-flashcard-set',
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
  )

  const updateSet = useMutation(
    async ({ id, name, userId }) => {
      const { error } = await upsertSet({ id, name, user_id: userId })

      if (error) throw error
    },
    {
      mutationKey: 'update-flashcard-set',
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
  )

  const addCardToSet = useMutation(async ({ word, definition, setId }) => {
    const { data, error } = await upsertFlashcard({
      set_id: setId,
      word,
      definition,
    })

    if (error) throw error

    return data[0]
  })

  return {
    flashcardSets,
    isError,
    isLoading,
    createNewSet,
    updateSet,
    deleteSet,
    addCardToSet,
  }
}
