import { PageHome } from '@/lib/components/home/PageHome'
import { fetchHomepageStats } from '@/lib/api'
import { getWordsOfTheDay } from '@/lib/domain-logic/analytics'

export default PageHome

export const getServerSideProps = async () => {
  const stats = await fetchHomepageStats()
  const wordsOfTheDay = await getWordsOfTheDay()

  return {
    props: {
      opengraph: {
        title: 'Trang Chủ',
      },
      stats,
      wordsOfTheDay,
    },
  }
}
