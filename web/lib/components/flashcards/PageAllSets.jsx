import { useUser } from '@/lib/auth'
import { useTranslation } from '@/lib/i18n'

import { Breadcrumb } from '../common/Breadcrumb'
import { Layout } from '../common/Layout'

import { useAllSets } from './useAllSets'
import { Sets } from './Sets'

export function PageAllSets() {
  const { _e } = useTranslation()
  const { user } = useUser({ redirectIfUnauthenticated: true })
  const { flashcardSets, isLoading } = useAllSets({ user, fetchAllSets: true })

  if (isLoading) return <Layout loading />

  const links = [
    { href: '/', name: _e('nav.home') },
    { href: '/flashcards', name: _e('nav.flashcards') },
  ]

  return (
    <Layout>
      <div className="container">
        <div className="mb-4">
          <Breadcrumb links={links} />
        </div>

        <Sets flashcardSets={flashcardSets} />
      </div>
    </Layout>
  )
}
