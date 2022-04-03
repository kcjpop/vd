import { Layout } from '../common/Layout'
import { Login } from './Login'

export function LoginPage({ opengraph }) {
  return (
    <Layout opengraph={opengraph}>
      <Login />
    </Layout>
  )
}
