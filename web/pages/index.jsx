import { PageHome } from '@/lib/components/home/PageHome'
import { fetchHomepageStats } from '@/lib/api'

export default PageHome

export const getServerSideProps = async () => {
  const stats = await fetchHomepageStats()

  return {
    props: {
      opengraph: {
        title: 'Trang Chủ',
      },
      stats,
    },
  }
}
