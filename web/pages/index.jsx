import { Page } from '@/lib/components/home'
import { fetchHomepageStats } from '@/lib/api'

export default Page

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
