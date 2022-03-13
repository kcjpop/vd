import { Layout } from '@/lib/common/Layout'
import { Search } from './Search'

export function Home() {
  return (
    <Layout>
      <div className="mt-4">
        <Search></Search>
      </div>
    </Layout>
  )
}
