import { Layout } from '../common/Layout'
import { Loading } from '../common/Loading'
import { useUser } from '../../auth'

import { useAllSets } from './useAllSets'
import { Sets } from './Sets'

export function PageAllSets() {
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const { flashcardSets, isLoading, updateSet } = useAllSets({
    user,
    fetchAllSets: true,
    fields: 'id, name, user_id, flashcards(id)',
  })

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container">
        <Sets flashcardSets={flashcardSets} updateSet={updateSet} />
      </div>
    </Layout>
  )
}
