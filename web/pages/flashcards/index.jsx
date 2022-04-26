import { PageAllSets } from '@/lib/components/flashcards/PageAllSets'

export default PageAllSets

export function getServerSideProps({ query }) {
  return { props: { page: Number(query.page) || 1 } }
}
