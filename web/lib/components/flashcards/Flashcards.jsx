import { Layout } from '../common/Layout'
import { useFlashcardSets } from '../../domain-logic/flashcards'

import { Sets } from './Sets'

import s from './style.module.css'

export function Page() {
  const { flashcardSets } = useFlashcardSets()

  return (
    <Layout>
      <div className={s.layout}>
        <Sets flashcardSets={flashcardSets} />
      </div>
    </Layout>
  )
}
