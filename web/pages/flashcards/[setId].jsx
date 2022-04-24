import { PageSingleSet } from '@/lib/components/flashcards/PageSingleSet'

export default PageSingleSet

export function getServerSideProps({ query }) {
  return { props: { setId: query.setId } }
}
