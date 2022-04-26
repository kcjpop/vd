import { useState } from 'react'
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
  fields = 'id, name, flashcards(id)',
}) {
  const queryClient = useQueryClient()
  const queryKey = ['flashcard-sets', user?.id, page]
  const [total, setTotal] = useState(0)

  const {
    data: flashcardSets,
    isError,
    isLoading,
  } = useQuery(
    queryKey,
    async () => {
      if (!user) return []

      const {
        data: sets,
        error,
        count,
      } = perPage
        ? await getPaginatedSets(
            {
              userId: user.id,
              ...getRange(page, perPage),
            },
            { fields },
          )
        : await getAllSets({ userId: user.id }, { fields })
      if (error) throw error

      count !== undefined && setTotal(count)

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
    async ({ id }) => {
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
    total,
    isError,
    isLoading,
    createNewSet,
    updateSet,
    deleteSet,
    addCardToSet,
  }
}
