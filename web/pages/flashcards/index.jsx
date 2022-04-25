import { PageAllSets } from '@/lib/components/flashcards/PageAllSets'

export default PageAllSets

export function getServerSideProps({ query }) {
  return { props: { page: query.page || 1 } }
}
