import { Layout } from '@/lib/components/common/Layout'
import { Search } from './Search'

export function Page() {
  return (
    <Layout
      opengraph={{
        title: 'Trang Chủ',
      }}>
      <Search></Search>
    </Layout>
  )
}
