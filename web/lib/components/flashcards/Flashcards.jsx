import { Layout } from '../common/Layout'
import { useFlashcardSets } from '../../hooks/flashcards/useFlashcardSets'
import { useUser } from '../../domain-logic/auth'

import { Sets } from './Sets'

export function Page() {
  const { user } = useUser()
  const { flashcardSets } = useFlashcardSets({ user })

  return (
    <Layout>
      <div className="container">
        <Sets flashcardSets={flashcardSets} />
      </div>
    </Layout>
  )
}
