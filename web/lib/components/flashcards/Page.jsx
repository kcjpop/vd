import { useState } from 'react'

import { Layout } from '../common/Layout'
import { useFlashcardSets } from '../../domain-logic/flashcards'

import { Sidebar } from './Sidebar'
import { Content } from './Content'

import s from './style.module.css'

export function Page() {
  const [selected, setSelected] = useState(null)

  const { flashcardSets } = useFlashcardSets()

  function selectFlashcardSet(e) {
    e.target.dataset.id !== selected && setSelected(e.target.dataset.id)
  }

  return (
    <Layout>
      <div className={`grid grid-rows-1 ${s.layout}`}>
        {/* Sidebar */}
        <div className="block w-1/4 min-w-fit auto-cols-min">
          <Sidebar
            flashcardSets={flashcardSets}
            selected={selected}
            setSelected={selectFlashcardSet}
          />
        </div>
        <div className="block">
          <Content selected={selected} />
        </div>
      </div>
    </Layout>
  )
}
