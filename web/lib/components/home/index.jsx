import { Layout } from '@/lib/components/common/Layout'
import { Search } from './Search'

export function Page({ opengraph }) {
  return (
    <Layout opengraph={opengraph}>
      <Search></Search>
    </Layout>
  )
}
