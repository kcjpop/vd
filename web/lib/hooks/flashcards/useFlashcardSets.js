import { useQuery, useMutation, useQueryClient } from 'react-query'

import {
  getFlashcardSets,
  upsertFlashcardSets,
  deleteFlashcardSet,
} from './query'

export function useFlashcardSets({ user }) {
  const queryClient = useQueryClient()
  const queryKey = ['flashcard-sets', user?.id]

  const {
    data: flashcardSets,
    isError,
    isLoading,
  } = useQuery(queryKey, async () => {
    if (!user) return

    const { data: sets, error } = await getFlashcardSets({ userId: user.id })
    if (error) throw error

    return sets
  })

  const modifyFlashcardSet = useMutation(
    async (set) => {
      if (!set.user_id) set.user_id = user.id

      const { data, error } = await upsertFlashcardSets(set)

      if (error) throw error
      return data[0]
    },
    {
      mutationKey: 'upsert-flashcard-set',
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
  )

  const removeFlashcardSet = useMutation(
    async (id) => {
      const { error } = await deleteFlashcardSet({ id })

      if (error) throw error
    },
    {
      mutationKey: 'delete-flashcard-set',
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    },
  )

  return {
    flashcardSets,
    isError,
    isLoading,
    modifyFlashcardSet,
    removeFlashcardSet,
  }
}
