import { Auth } from './Auth'
import { Account } from './Account'
import { Layout } from '../common/Layout'

export function Page({ session, opengraph }) {
  return (
    <Layout opengraph={opengraph}>
      {session ? (
        <Account session={session} key={session?.user.id} />
      ) : (
        <Auth />
      )}
    </Layout>
  )
}
