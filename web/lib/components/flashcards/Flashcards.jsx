import { Layout } from '../common/Layout'
import { useFlashcardSets } from '../../hooks/flashcards/useFlashcardSets'

import { Sets } from './Sets'

export function Page() {
  const { flashcardSets } = useFlashcardSets()

  return (
    <Layout>
      <div className="container">
        <Sets flashcardSets={flashcardSets} />
      </div>
    </Layout>
  )
}
