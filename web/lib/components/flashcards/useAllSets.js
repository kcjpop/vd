import { useQuery, useMutation, useQueryClient } from 'react-query'

import {
  getAllSets,
  getPaginatedSets,
  upsertSet,
  upsertFlashcard,
  deleteFlashcardSet,
} from './query'

function getRange(page, perPage) {
  return { from: page * perPage - perPage, to: page * perPage - 1 }
}

export function useAllSets({
  user,
  fetchAllSets = false,
  perPage = null,
  page = 0,
}) {
  const queryClient = useQueryClient()
  const queryKey = ['flashcard-sets', user?.id, page]

  const {
    data: flashcardSets,
    isError,
    isLoading,
  } = useQuery(
    queryKey,
    async () => {
      if (!user) return []

      const { data: sets, error } = perPage
        ? await getPaginatedSets({
            userId: user.id,
            ...getRange(page, perPage),
          })
        : await getAllSets({ userId: user.id })
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
    deleteSet,
    addCardToSet,
  }
}
