import { Layout } from '../common/Layout'

// import { Sidebar } from './Sidebar'

export function Page({ opengraph }) {
  return (
    <Layout navVariant="search" opengraph={opengraph}>
      <div className="container">{/* <Sidebar sets={sets} /> */}</div>
    </Layout>
  )
}
