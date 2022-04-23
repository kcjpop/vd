import { Layout } from '../common/Layout'
import { Loading } from '../common/Loading'
import { useUser } from '../../auth'

import { useAllSets } from './useAllSets'
import { Sets } from './Sets'

export function PageAllSets() {
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const { flashcardSets, isLoading } = useAllSets({ user, fetchAllSets: true })

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
        <Sets flashcardSets={flashcardSets} />
      </div>
    </Layout>
  )
}
