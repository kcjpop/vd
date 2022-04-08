import { Layout } from '../common/Layout'
import { Login } from './Login'
import { Register } from './Register'

export function LoginPage({ opengraph }) {
  return (
    <Layout opengraph={opengraph}>
      <Login />
    </Layout>
  )
}

export function RegisterPage({ opengraph }) {
  return (
    <Layout opengraph={opengraph}>
      <Register />
    </Layout>
  )
}
