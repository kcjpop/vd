import { Page } from '@/lib/components/flashcards'
import { fetchBannerEndpoint } from '@/lib/api'

export default Page

export function getServerSideProps() {
  return {
    props: {
      opengraph: 'Thẻ nhớ',
      image: fetchBannerEndpoint({ word: 'flashcard' }),
    },
  }
}
